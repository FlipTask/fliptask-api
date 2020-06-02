const Sequelize = require("sequelize");
const sequelize = require("../database");

const TaskComment = sequelize.define(
    "task_comment", {
      message : {
        type : Sequelize.TEXT,
        allowNull : false,
        validate : {notNull : {msg : "Text is required."}}
      }
    },
    {paranoid : true, underscored : true, freezeTableName : true});

TaskComment.belongsTo(User, {foreignKey : "createdBy"});
User.hasMany(TaskComment, {as : "createdComments", foreignKey : "createdBy"});

TaskComment.belongsTo(Task);
Task.hasMany(TaskComment);

global.TaskComment = TaskComment;
