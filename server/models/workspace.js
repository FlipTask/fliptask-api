const Sequelize = require("sequelize");
const sequelize = require("../database");

const Workspace = sequelize.define("workspace", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    isPrivate: Sequelize.BOOLEAN
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Workspace.belongsTo(User, { foreignKey: "createdBy" });
Workspace.belongsTo(Organisation);
Workspace.belongsTo(Team);

global.Workspace = Workspace;
