const Permissions = require("../services/base/Permissions");
const CrudRouter = require("./base/CrudRouter");

const workspaceRouter = new CrudRouter("/workspace", workspaceController);

const workspacePermission = new Permissions();
workspaceRouter.mergeRoutes({
    "/": {
        get: [
            bearerAuth,
            Modifier.paramIdIsOrgId,
            Modifier.createdByUser,
            workspacePermission._userIsOrgMember,
            workspaceController.list
        ],
        post: [
            bearerAuth,
            workspacePermission._userIsOrgMember,
            workspaceController.create
        ]
    }
});



workspaceRouter.register();
