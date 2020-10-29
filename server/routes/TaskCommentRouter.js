const CrudRouter = require("./base/CrudRouter");

const taskCommentRouter = new CrudRouter("/task-comment", TaskCommentController);

taskCommentRouter.register();
