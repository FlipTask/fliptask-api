const Sequelize = require("sequelize");
const sequelize = require("../database");

const Organisation = sequelize.define("organisation", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required."
            }
        }
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Organisation.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Organisation, { as: "createdOrganisations", foreignKey: "createdBy" });

global.Organisation = Organisation;
