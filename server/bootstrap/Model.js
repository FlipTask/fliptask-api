const fs = require("fs");
const Path = require("path");

const init = async () => {
    const schemas = fs.readdirSync(Path.resolve(__dirname, "../models"));
    const resolvedSchemas = await schemas.reduce(async (acc, file) => {
        try {
            const res = await require(`./../models/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = await Mongoose.model(dep, res);
            global[dep] = acc[dep];
            // console.info(`[INFO] Dependency [${file}] loaded from [models]`);
            return acc;
        } catch (e) {
            console.error(`[Error] Unable to load ${file}`, e);
            return e;
        }
    }, {});
    return resolvedSchemas;
};

module.exports = init;
