const Sequelize = require("sequelize");
const sequelize = require("../database");

const Task = sequelize.define(
  "task",
  {
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: { notNull: { msg: "Name is required." } },
    },
    description: { type: Sequelize.TEXT, allowNull: false },
    priority: Sequelize.INTEGER,
    due_date: Sequelize.DATE,
    sequence: Sequelize.INTEGER,
    weight: Sequelize.INTEGER,
  },
  { paranoid: true, underscored: true, freezeTableName: true }
);

Task.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Task, { as: "createdTasks", foreignKey: "createdBy" });

Task.belongsTo(TaskList);
TaskList.hasMany(Task);

Task.belongsTo(User, { foreignKey: "assignee" });
User.hasMany(Task, { as: "assignedTasks", foreignKey: "assignee" });

global.Task = Task;
