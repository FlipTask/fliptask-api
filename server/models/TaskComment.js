const Sequelize = require("sequelize");
const sequelize = require("../database");

const TaskComment = sequelize.define("task_comment", {
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Text is required."
            }
        }
    }
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

TaskComment.belongsTo(User, { foreignKey: "createdBy", allowNull: false });
User.hasMany(TaskComment, { as: "createdComments", foreignKey: "createdBy" });

TaskComment.belongsTo(Task, { foreignKey: { allowNull: false } });
Task.hasMany(TaskComment);

global.TaskComment = TaskComment;
