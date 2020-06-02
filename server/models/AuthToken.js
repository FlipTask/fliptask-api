const Sequelize = require("sequelize");
const sequelize = require("../database");

const AuthToken = sequelize.define(
  "auth_token",
  {
    token: { type: Sequelize.STRING(100), allowNull: false },
    deviceId: Sequelize.STRING(100),
    expiresAt: Sequelize.DATE,
  },
  { paranoid: true, underscored: true, freezeTableName: true }
);

AuthToken.belongsTo(User);

global.AuthToken = AuthToken;
