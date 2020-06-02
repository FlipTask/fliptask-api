const Sequelize = require("sequelize");
const sequelize = require("../database");

const UserTeamMap = sequelize.define(
    "user_team_map", {
      user_id : Sequelize.INTEGER,
      team_id : Sequelize.INTEGER,
      is_admin : Sequelize.BOOLEAN
    },
    {paranoid : true, underscored : true, freezeTableName : true});

User.belongsToMany(Team, {through : UserTeamMap});
Team.belongsToMany(User, {as : "members", through : UserTeamMap});

global.UserTeamMap = UserTeamMap;
