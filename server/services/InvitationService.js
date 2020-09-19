const CrudService = require("./base/CrudService");
const crypto = require("crypto");

class InvitationService extends CrudService {
    _inviteOne = async (createdBy, organisationId, email) => {
        const organisation = await Organisation.findByPk(organisationId);

        if (!organisation) {
            return "Organisation does not exist.";
        }

        const existingUser = await User.findOne({
            where: {
                email
            }
        });

        if (existingUser) {
            if (await organisation.hasMember(existingUser)) {
                return `${email} is already a member as ${existingUser.firstName} ${existingUser.lastName}.`
            }
        }

        try {
            const link = crypto.randomBytes(20).toString('hex');
            const invitation = await Invitation.create({
                createdBy,
                organisationId,
                email,
                link,
                status: 'invited'
            });
            return `${email} has been invited to join.`
        } catch (error) {
            console.log("error", error);
            return error
        }
    }

    inviteMany = async ({ createdBy, organisationId, emailList }) => {
        const response = emailList.reduce(async (acc, email) => {
            const response = await this._inviteOne(createdBy, organisationId, email);
            return {
                ...await acc,
                [email]: response
            };
        }, {});

        return response;
    }

    details = async (link) => {
        const invitation = await Invitation.findOne({
            where: {
                link
            },
            include: [
                Organisation,
                User
            ]
        });

        if (!invitation) {
            throw new FliptaskError("Invalid invitation.")
        }

        if (invitation.status != 'invited') {
            return invitation
        }

        const invitedUser = await User.findOne({
            where: {
                email: invitation.email
            }
        });

        if (invitedUser) {
            return {
                ...invitation.get(),
                invitedUser
            }
        }
    }

    _saveInvitation = async ({ invitation, status }) => {
        invitation.status = status;
        invitation.resolvedAt = Date.now();
        await invitation.save();
        return {
            message: `Invitation ${status}.`
        }
    }

    _resolveValidInvitation = async ({ user, invitation, accept }) => {
        const organisation = await invitation.getOrganisation();
        if (organisation.hasMember(user)) {
            await this._saveInvitation({ invitation, status: "duplicate" });
            return {
                message: `You're already a member of ${organisation.name}.`
            }
        }

        const accepted = accept == "true";

        if (accepted) {
            await organisation.addMember(user);
        }

        const status = accepted ? "accepted" : "rejected";
        return await this._saveInvitation({ invitation, status });
    }

    resolve = async ({ user, link, accept }) => {
        const invitation = await Invitation.findOne({
            where: {
                link,
                email: user.email
            }
        });

        if (!invitation) {
            throw new FliptaskError("Invalid link");
        }

        if (invitation.resolvedAt) {
            return {
                message: `Invitation has been already ${invitation.status}.`
            }
        }

        return await this._resolveValidInvitation({ user, invitation, accept });
    }
}

global.InvitationService = new InvitationService(Invitation);
