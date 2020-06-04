const CrudService = require("./base/CrudService");

class OrganisationService extends CrudService {
    afterCreate = async ({ data, createResponse }) => {
        await createResponse.addMember(
            data.createdBy,
            { through: { isAdmin: true } }
        );
        return createResponse;
    }
}

global.OrganisationService = new OrganisationService(Organisation);
