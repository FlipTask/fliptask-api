const CrudRouter = require("./base/CrudRouter");

const invitationRouter = new CrudRouter("/invitation", InvitationController);

invitationRouter.mergeRoutes({
    "/invite": {
        post: [
            bearerAuth,
            InvitationController.invite
        ]
    }
});

invitationRouter.register();
