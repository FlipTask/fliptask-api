const Permissions = require("../services/base/Permissions");
const CrudRouter = require("./base/CrudRouter");

const workspaceRouter = new CrudRouter("/workspace", workspaceController);

workspaceRouter.mergeRoutes({
    "/": {
        get: [
            bearerAuth,
            Permission.userIsOrgMember,
            workspaceController.list
        ],
        post: [
            bearerAuth,
            Permission.userIsOrgMember,
            workspaceController.create
        ]
    }
});



workspaceRouter.register();
