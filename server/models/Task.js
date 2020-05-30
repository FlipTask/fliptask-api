const Sequelize = require("sequelize");
const sequelize = require("../database");

const Task = sequelize.define("task", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    priority: Sequelize.INTEGER,
    due_date: Sequelize.DATE,
    sequence: Sequelize.INTEGER,
    weight: Sequelize.INTEGER
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

Task.belongsTo(User, { foreignKey: "createdBy" });
Task.belongsTo(TaskList);
Task.belongsTo(User, { foreignKey: "asignee" });

global.Task = Task;
