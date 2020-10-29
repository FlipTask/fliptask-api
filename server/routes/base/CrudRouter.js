const Permissions = require("../../services/base/Permissions");
const permission = new Permissions();
class CrudRouter {
    constructor(basePath, controller) {
        this.basePath = basePath;
        this.controller = controller;

        this.routes = {
            "/": {
                get: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    Modifier.paramIdIsOrgId,
                    Modifier.createdByUser,
                    this.controller.list
                ],
                post: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    Modifier.paramIdIsOrgId,
                    Modifier.createdByUser,
                    this.controller.create
                ]
            },
            "/:id": {
                get: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    Modifier.paramIdIsOrgId,
                    Modifier.createdByUser,
                    permission._userIsOrgMember,
                    this.controller.get
                ],
                patch: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    Modifier.paramIdIsOrgId,
                    Modifier.createdByUser,
                    this.controller.update
                ],
                delete: [
                    bearerAuth,
                    Permission.isEmailVerified,
                    Modifier.paramIdIsOrgId,
                    Modifier.createdByUser,
                    this.controller.delete
                ]
            }
        };
    }

    mergeRoutes = async (routes) => {
        this.routes = {
            ...this.routes,
            ...routes
        }
    }

    register = async () => {
        for (const endpoint in this.routes) {
            for (const method in this.routes[endpoint]) {
                // console.log(method, this.basePath + endpoint, this.routes[endpoint][method]);
                expressApp[method](this.basePath+endpoint, this.routes[endpoint][method]);
            }
        }
    }
}

module.exports = CrudRouter;
