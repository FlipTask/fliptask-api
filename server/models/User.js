const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "First Name is required."
            }
        }
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Last Name is required."
            }
        }
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Valid email is required"
            },
            isEmail: {
                msg: "Valid email is required"
            }
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
