const fs = require("fs");
const Path = require("path");

const init = async () => {
    const controllers = fs.readdirSync(Path.resolve(__dirname, "../controllers"));
    const resolvedcontrollers = controllers.reduce(async (acc, file) => {
        try {
            const res = await require(`./../controllers/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = res;
            global[dep] = acc[dep];
            console.info(`[INFO] Dependency [${file}] loaded from [controllers]`);
            return acc;
        } catch (e) {
            console.error(`[Error] Unable to load ${file}`, e);
            return e;
        }
    }, {});
    return resolvedcontrollers;
};

module.exports = init;
