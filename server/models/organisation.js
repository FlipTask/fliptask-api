const Sequelize = require("sequelize");
const sequelize = require("../database");

const Organisation = sequelize.define("organisation", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Organisation.belongsTo(User, { foreignKey: "created_by" });

global.Organisation = Organisation;
