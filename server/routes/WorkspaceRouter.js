const CrudRouter = require("./base/CrudRouter");

const workspaceRouter = new CrudRouter("/workspace", WorkspaceController);

workspaceRouter.register();
