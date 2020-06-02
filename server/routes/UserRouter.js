const CrudRouter = require("./base/CrudRouter");

const userRouter = new CrudRouter("/user", UserController);

userRouter.mergeRoutes({
  "/signup": { post: [UserController.create] },
  "/login": { post: [UserController.login] },
  "/me": { get: [bearerAuth, UserController.me] },
  "/logout": { get: [UserController.logout] },
});

userRouter.register();
