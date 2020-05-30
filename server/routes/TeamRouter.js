const CrudRouter = require("./base/CrudRouter");

const teamRouter = new CrudRouter("/team", TeamController);

teamRouter.register();
