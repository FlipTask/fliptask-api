const CrudRouter = require("./base/CrudRouter");

const invitationRouter = new CrudRouter("/organisation", InvitationController);

invitationRouter.register();
