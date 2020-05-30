const Sequelize = require("sequelize");
const sequelize = require("../database");

const Team = sequelize.define("team", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Team.belongsTo(User, { foreignKey: "createdBy" });
Team.belongsTo(Organisation);

global.Team = Team;
