const Sequelize = require("sequelize");
const sequelize = require("../database");

const Invitation = sequelize.define("invitation", {
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    link: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    resolvedAt: Sequelize.DATE
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Invitation.belongsTo(User, { foreignKey: "createdBy", allowNull: false });
Invitation.belongsTo(Organisation);

global.Invitation = Invitation;
