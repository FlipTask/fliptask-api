const CrudService = require("./base/CrudService");

class TeamService extends CrudService {
    beforeCreate = async ({ createdBy, organisationId }) => {
        const organisation = await Organisation.findByPk(organisationId);
        if (!organisation) {
            throw "Missing or incorrect params";
        } else {
            const userOrganisationMap = await UserOrganisationMap.findOne({
                where: {
                    userId: createdBy,
                    organisationId,
                    isAdmin: true
                }
            });

            if (!userOrganisationMap) {
                throw "Not authorised to create a team."
            }
        }
    }

    afterCreate = async ({ data, createResponse }) => {
        await createResponse.addMember(
            data.createdBy,
            { through: { isAdmin: true } }
        );
        return createResponse;
    }
}


global.TeamService = new TeamService(Team);
