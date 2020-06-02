const sequelize = require("./sequelize");

sequelize.sync({alter : true});
