const CrudRouter = require("./base/CrudRouter");

const invitationRouter = new CrudRouter("/invitation", InvitationController);

invitationRouter.mergeRoutes({
    "/": {
        get: [
            bearerAuth,
            Modifier.createdByUser,
            InvitationController.list
        ],
        post: [
            bearerAuth,
            InvitationController.create
        ]
    },
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
