const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(200),
        validate: {
            isEmail: true
        }
    },
    phone: Sequelize.STRING(15),
    password: Sequelize.STRING,
    isEmailVerified: Sequelize.BOOLEAN,
    isPhoneVerified: Sequelize.BOOLEAN
}, {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});

global.User = User;
