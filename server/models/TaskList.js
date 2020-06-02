const Sequelize = require("sequelize");
const sequelize = require("../database");

const TaskList = sequelize.define(
    "task_list", {
      name : {
        type : Sequelize.STRING(50),
        allowNull : false,
        validate : {notNull : {msg : "Name is required."}}
      }
    },
    {paranoid : true, underscored : true, freezeTableName : true});

TaskList.belongsTo(User, {foreignKey : "createdBy"});
User.hasMany(TaskList, {as : "createdTaskLists", foreignKey : "createdBy"});

TaskList.belongsTo(Workspace);
Workspace.hasMany(TaskList);

global.TaskList = TaskList;
