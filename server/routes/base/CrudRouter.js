class CrudRouter {
    constructor(basePath, controller) {
        this.basePath = basePath;
        this.controller = controller;

        this.routes = {
            "/": {
                get: [
                    this.controller.list
                ],
                post: [
                    this.controller.create
                ]
            },
            "/:id": {
                get: [
                    this.controller.get
                ],
                patch: [
                    this.controller.update
                ],
                delete: [
                    this.controller.delete
                ]
            },
        };
    }

    addRoutes = async (routes) => {
        this.routes = {
            ...this.routes,
            ...routes
        }
    }

    register = async () => {
        for (const endpoint in this.routes) {
            for (const method in this.routes[endpoint]) {
                expressApp[method](this.basePath+endpoint, this.routes[endpoint][method]);
            }
        }
    }
}

module.exports = CrudRouter;
