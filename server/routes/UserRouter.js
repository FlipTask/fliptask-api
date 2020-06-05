const CrudRouter = require("./base/CrudRouter");

const userRouter = new CrudRouter("/user", UserController);

userRouter.mergeRoutes({
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
            UserController.me
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
});

userRouter.register();
