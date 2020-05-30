const express = require("express");
const Path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const httpLogger = morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms"
].join(" "));


const init = async (moduleObj) => {
    const app = express();

    app.use("/assets/", express.static(Path.resolve(__dirname, "./../assets")));
    app.use("/images/", express.static(Path.resolve(__dirname, "./../upload")));

    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(httpLogger);
    const corsOptions = {
        origin: "*",
        optionsSuccessStatus: 200
    };

    // app.options("*", cors(corsOptions));
    app.use(cors(corsOptions));
    for (let i = 0; i < moduleObj.Route.length; i++) {
        const route = moduleObj.Route[i];
        app.use("/api", route.router);
    }

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening to ${PORT}....`);
        console.log("Press Ctrl+C to quit.");
    });
};

module.exports = init;
