const CrudService = require("./base/CrudService");
const initOrganisation = require("./base/initOrganisation");

class OrganisationService extends CrudService {
    afterCreate = async ({ data, createResponse }) => {
        await createResponse.addMember(
            data.createdBy,
            { through: { isAdmin: true } }
        );

        await initOrganisation(createResponse);

        return createResponse;
    }
}

global.OrganisationService = new OrganisationService(Organisation);
