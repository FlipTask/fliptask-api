const Sequelize = require("sequelize");
const sequelize = require("../database");

const UserTeamMap = sequelize.define("user_team_map", {
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

User.belongsToMany(Team, { as: "teams", through: UserTeamMap });
Team.belongsToMany(User, { as: "members", through: UserTeamMap });

global.UserTeamMap = UserTeamMap;
