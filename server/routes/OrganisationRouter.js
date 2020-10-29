const CrudRouter = require("./base/CrudRouter");
const Permissions = require("../services/base/Permissions");

const permission = new Permissions();
const organisationRouter = new CrudRouter("/organisation", OrganisationController);

organisationRouter.register();
