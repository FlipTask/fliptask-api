const Umzug = require("umzug");
const sequelize = require("./sequelize");

const umzug = new Umzug({
    migrations: {
        path: "./server/database/migrations",
        params: [
            sequelize.getQueryInterface()
        ]
    },
    storage: "sequelize",
    storageOptions: {
        sequelize
    }
});

(async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzug.up();
})();
