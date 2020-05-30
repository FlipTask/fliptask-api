const CrudController = require("./base/CrudController");

global.TaskListController = new CrudController(TaskListService);
