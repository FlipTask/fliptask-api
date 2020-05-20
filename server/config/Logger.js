const winston = require("winston");
// eslint-disable-next-line no-unused-vars
const rotate = require("winston-daily-rotate-file");
const fs = require("fs");

const dir = process.env.LOG_DIR;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const init = async () => winston.createLogger({
    level: "info",
    transports: [
        new (winston.transports.Console)({
            colorize: true
        }),
        new winston.transports.DailyRotateFile({
            filename: "info.log",
            dirname: process.env.LOG_DIR,
            maxsize: 20971520, // 20MB
            maxFiles: 25,
            datePattern: ".dd-MM-yyyy"
        })
    ]
});


module.exports = init;
