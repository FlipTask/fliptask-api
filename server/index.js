require("dotenv").config();

const loadDependency = async (type, dep, moduleObj) => {
    try {
        const res = await require(`./${type}/${dep}`);
        global[dep] = typeof (res) === "function" ? await res(moduleObj) : await res;
        moduleObj[dep] = global[dep];
        // console.info(`[INFO] Dependency [${dep}] loaded from [${type}]`);
        return global[dep];
    } catch (e) {
        console.error(`[Error] Unable to load ${dep}\n`, e);
        return e;
    }
};
const configuration = {
    metaServices: [
        "MailerService"
    ],
    bootstrap: [
        "Multer",
        "Mailer",
        // "Logger",
        // "DB",
        // "Model",
        // "Middleware",
        // "Controller",
        // "Route",
        "Express"
    ]
};
const loadConfig = async () => {
    const moduleObj = {};
    const typeList = Object.keys(configuration);
    for (let i = 0; i < typeList.length; i++) {
        const type = typeList[i];
        // console.log(`[#################################******** Loading ${type} *********#################################]`);
        for (let j = 0; j < configuration[type].length; j++) {
            const name = configuration[type][j];
            // eslint-disable-next-line no-await-in-loop
            await loadDependency(type, name, moduleObj);
        }
    }
};

const loadApp = async () => {
    await loadConfig();

    global.getMethods = (obj) => {
        const properties = new Set();
        let currentObj = obj;
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return [...properties.keys()].filter(item => typeof obj[item] === 'function')
    };

    global.getProperties = (obj) => {
        const properties = new Set();
        let currentObj = obj;
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return [...properties.keys()].filter(item => typeof obj[item] === 'object')
    };

    require("./utils");
    require("./database");
    require("./errors");
    require("./models");
    require("./services");
    require("./controllers");
    require("./auth");
    require("./middlewares");
    require("./routes");

    const { PORT } = process.env;
    expressApp.listen(PORT, () => {
        console.log(`App listening to ${PORT}....`);
        console.log("Press Ctrl+C to quit.");
    });
};

loadApp();
