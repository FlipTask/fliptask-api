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
}

global.InvitationService = new InvitationService(Invitation);
