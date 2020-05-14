import * as fs from "fs";
import Path from "path";

const init = async() => {
    const schemas = fs.readdirSync(Path.resolve(__dirname,"../server/models"));
    const resolvedSchemas = await schemas.reduce(async(acc,file) => {
        try{
            const res = await import(`./../models/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = await Mongoose.model(dep,res.default);
            global[dep] = acc[dep];
            console.info(`[INFO] Dependency [${file}] loaded from [models]`);
            return acc;
        }catch(e){
            console.error(`[Error] Unable to load ${file}`,e);
        }
    },{});
    return resolvedSchemas;
}

export default init;