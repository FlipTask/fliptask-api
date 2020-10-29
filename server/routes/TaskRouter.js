const CrudRouter = require("./base/CrudRouter");

const taskRouter = new CrudRouter("/task", TaskController);

taskRouter.register();
