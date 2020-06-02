const CrudRouter = require("./base/CrudRouter");

const organisationRouter =
    new CrudRouter("/organisation", OrganisationController);

organisationRouter.register();
