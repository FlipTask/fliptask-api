const Sequelize = require("sequelize");
const sequelize = require("../database");

const Team = sequelize.define("team", {
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

Team.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Team, { as: "createdTeams", foreignKey: "createdBy" });

Team.belongsTo(Organisation);
Organisation.hasMany(Team);

global.Team = Team;
