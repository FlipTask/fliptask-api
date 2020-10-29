const Response = require("./../../controllers/base/Response");
class Permissions {
    _userIsOrgMember = async (req, res, next) => {
        try {
            const { organisationId } = req;
            const { createdBy } = req.query;
            const organisation = await Organisation.findByPk(organisationId);
            if (!organisation) {
                throw FliptaskError.missingParams("Missing or incorrect params");
            } else {
                const userOrganisationMap = await UserOrganisationMap.findOne({
                    where: {
                        userId: createdBy,
                        organisationId,
                    }
                });
                if (!userOrganisationMap) {
                    throw FliptaskError.permissionDenied();
                }
            }
        } catch (err) {
            // throw FliptaskError.serverError();
            return Response.error(res, err);
        }
        next();
    }
}

module.exports = Permissions;
