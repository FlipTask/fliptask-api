const CrudService = require("./base/CrudService");

class TeamService extends CrudService {
    beforeCreate = async (data) => {
        await this._userIsOrgMember(data);
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
