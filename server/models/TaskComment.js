const Sequelize = require("sequelize");
const sequelize = require("../database");

const TaskComment = sequelize.define("task_comment", {
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

TaskComment.belongsTo(User, { foreignKey: "createdBy" });
TaskComment.belongsTo(Task);

global.TaskComment = TaskComment;
