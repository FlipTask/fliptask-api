const CrudRouter = require("./base/CrudRouter");

const invitationRouter = new CrudRouter("/invitation", InvitationController);

invitationRouter.mergeRoutes({
    "/": {
        get: [
            bearerAuth,
            Permission.isEmailVerified,
            Modifier.createdByUser,
            InvitationController.list
        ],
        post: [
            bearerAuth,
            Permission.isEmailVerified,
            InvitationController.create
        ]
    },
    "/invite": {
        post: [
            bearerAuth,
            Permission.isEmailVerified,
            InvitationController.invite
        ]
    },
    "/details": {
        get: [
            Permission.isEmailVerified,
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
