const CrudRouter = require("./base/CrudRouter");

const userRouter = new CrudRouter("/user", UserController);

userRouter.register();
