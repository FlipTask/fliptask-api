const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.db
);

sequelize.authenticate()
    .then(() => {
        console.info("Database connected.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
