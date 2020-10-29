const CrudRouter = require("./base/CrudRouter");

const taskListRouter = new CrudRouter("/task-list", TaskListController);

taskListRouter.register();
