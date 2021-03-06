const CrudController = require("./base/CrudController");
const Response = require("./base/Response");

class UserController extends CrudController {
    me = async (req, res, next) => {
        try {
            const data = await this.service.get(req.user.id, req.query);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }

    verifyEmail = async (req, res, next) => {
        try {
            const data = await this.service.verifyEmail(req.params.token);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }

    resendEmailVerificationLink = async (req, res, next) => {
        try {
            const data = await this.service.resendEmailVerificationLink(req.body.email);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }
    
    token = async (req, res, next) => {
        try {
            const data = await this.service.token(req.user);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error, 403);
        }
    }

    login = async (req, res, next) => {
        try {
            const data = await this.service.login(req.body);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error, 403);
        }
    }

    logout = async (req, res, next) => {
        try {
            const data = await this.service.logout(req);
            Response.success(res, data);
        } catch (error) {
            Response.error(res, error);
        }
    }
}

global.UserController = new UserController(UserService);
