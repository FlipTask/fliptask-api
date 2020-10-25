const Response = require("../controllers/base/Response");

class Permission {
    static async userIsOrgMember(req, res, next) {
        try {
            let orgId;
            if ("orgId" in res.locals) {
                orgId = res.locals.orgId;
            } else if (req.query && "organisationId" in req.query) {
                orgId = req.query.organisationId;
            } else if (req.body && "organisationId" in req.body) {
                orgId = req.body.organisationId;
            }
            const userOrgs = await req.user.getOrganisations();
            const orgIds = userOrgs.map((org) => org.id);
            if (orgIds.indexOf(parseInt(orgId, 10)) < 0) {
                throw FliptaskError.permissionDenied();
            }
            next();
        } catch (error) {
            console.log(error instanceof Error);
            Response.error(res, error);
        }
    }

    static async isEmailVerified(req, res, next) {
        try {
            if(!req.user.isEmailVerified) {
                throw FliptaskError.permissionDenied("Email verification is required !");
            }
            next();
        } catch (error) {
            console.log(error);
            Response.error(res, error);
        }
    }
}

global.Permission = Permission;