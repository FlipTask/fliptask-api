const CrudRouter = require("./base/CrudRouter");
class UserRouter extends CrudRouter {
    constructor(path, controller) {
        super(path, controller);
        const userRoutes = {
            "/signup": {
                post: [
                    UserController.create
                ]
            },
            "/login": {
                post: [
                    UserController.login
                ]
            },
            "/me": {
                get: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    UserController.me
                ]
            },
            "/verify_email/:token": {
                get: [
                    UserController.verifyEmail
                ]
            },
            "/resend_verification_email": {
                post: [
                    UserController.resendEmailVerificationLink
                ]
            },
            "/logout": {
                get: [
                    UserController.logout
                ]
            },
            "/auth/google": {
                get: [
                    googleAuth
                ]
            },
            "/auth/google/callback": {
                get: [
                    googleAuth,
                    UserController.token
                ]
            }
        };
        const crudRoutes = this.routes;
        this.routes = {
            ...userRoutes,
            ...this.routes,
        }
    }
}
const userRouter = new UserRouter("/user", UserController);

userRouter.register();
