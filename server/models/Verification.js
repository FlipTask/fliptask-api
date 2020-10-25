const Sequelize = require("sequelize");
const sequelize = require("../database");

const Verification = sequelize.define("verification", {
    isEmail: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    contact: {
        unique: true,
        type: Sequelize.STRING(100),
        allowNull: false
    },
    link: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    ttl: {
        type: Sequelize.INTEGER,
        defaultValue: 86400000 // 24 hours
    },
    resolvedAt: Sequelize.DATE
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

global.Verification = Verification;
