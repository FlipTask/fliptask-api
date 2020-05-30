const Sequelize = require("sequelize");
const sequelize = require("../database");

const UserOrganisationMap = sequelize.define("user_organisation_map", {
    user_id: Sequelize.INTEGER,
    organisation_id: Sequelize.INTEGER,
    is_admin: Sequelize.BOOLEAN
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

User.belongsToMany(Organisation, { through: UserOrganisationMap });

global.UserOrganisationMap = UserOrganisationMap;
