const Sequelize = require("sequelize");
const sequelize = require("../database");

const UserOrganisationMap = sequelize.define("user_organisation_map", {
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

User.belongsToMany(Organisation, { as: "organisations", through: UserOrganisationMap });
Organisation.belongsToMany(User, { as: "members", through: UserOrganisationMap });

global.UserOrganisationMap = UserOrganisationMap;
