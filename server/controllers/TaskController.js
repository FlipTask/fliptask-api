const CrudController = require("./base/CrudController");

global.TaskController = new CrudController(TaskService);
