const CrudController = require("./base/CrudController");

global.UserController = new CrudController(UserService);
