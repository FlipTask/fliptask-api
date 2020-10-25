const CrudService = require("./base/CrudService");

class TeamService extends CrudService {
    create = async (data, req) => {
        try {
            data.organisationId = req.organisationId;
            await this.beforeCreate(data);
            const createResponse = await this.model.create(data);
            return await this.afterCreate({ data, createResponse });
        } catch (err) {
            console.log(err);
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
