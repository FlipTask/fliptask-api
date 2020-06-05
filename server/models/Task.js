const Sequelize = require("sequelize");
const sequelize = require("../database");

const Task = sequelize.define("task", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required."
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    priority: Sequelize.INTEGER,
    dueDate: Sequelize.DATE,
    sequence: Sequelize.INTEGER,
    weight: Sequelize.INTEGER
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Task.belongsTo(User, { foreignKey: "createdBy", allowNull: false });
User.hasMany(Task, { as: "createdTasks", foreignKey: "createdBy" });

Task.belongsTo(TaskList, { foreignKey: { allowNull: false } });
TaskList.hasMany(Task);

Task.belongsTo(User, { foreignKey: "assignee" });
User.hasMany(Task, { as: "assignedTasks", foreignKey: "assignee" });

global.Task = Task;
