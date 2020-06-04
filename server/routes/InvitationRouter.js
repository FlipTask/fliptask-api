const CrudRouter = require("./base/CrudRouter");

const invitationRouter = new CrudRouter("/invitation", InvitationController);

invitationRouter.mergeRoutes({
    "/invite": {
        post: [
            bearerAuth,
            InvitationController.invite
        ]
    },
    "/details": {
        get: [
            InvitationController.details
        ]
    },
    "/resolve": {
        post: [
            bearerAuth,
            InvitationController.resolve
        ]
    }
});

invitationRouter.register();
