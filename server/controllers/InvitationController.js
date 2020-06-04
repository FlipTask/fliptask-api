const CrudController = require("./base/CrudController");
const Response = require("./base/Response");

class InvitationController extends CrudController {
    invite = async (req, res, next) => {
        try {
            if (!("organisationId" in req.body && "emailList" in req.body)) {
                throw "Missing parameters";
            }
            req.body.createdBy = req.user.id;
            const data = await this.service.inviteMany(req.body);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }

    details = async (req, res, next) => {
        try {
            if (!("link" in req.query)) {
                throw "Missing parameters";
            }
            const data = await this.service.details(req.query.link);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }

    resolve = async (req, res, next) => {
        try {
            const { user, body } = req;
            const { link, accept } = body;
            if (!(link && accept)) {
                throw "Missing parameters";
            }
            const data = await this.service.resolve({ user, link, accept });
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }
}

global.InvitationController = new InvitationController(InvitationService);
