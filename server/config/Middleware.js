const fs = require("fs");
const Path = require("path");

const init = async () => {
    const middlewares = fs.readdirSync(Path.resolve(__dirname, "../middlewares"));
    const resolvedmiddlewares = await middlewares.reduce(async (acc, file) => {
        try {
            const res = await require(`./../middlewares/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = res;
            global[dep] = acc[dep];
            console.info(`[INFO] Dependency [${file}] loaded from [middlewares]`);
            return acc;
        } catch (e) {
            console.error(`[Error] Unable to load ${file}`, e);
            return e;
        }
    }, {});
    return resolvedmiddlewares;
};

module.exports = init;
