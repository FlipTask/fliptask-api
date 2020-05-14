import * as fs from "fs";
import Path from "path";

const init = async() => {
    const middlewares = fs.readdirSync(Path.resolve(__dirname,"../server/middlewares"));
    const resolvedmiddlewares = await middlewares.reduce(async(acc,file) => {
        try{
            const res = await import(`./../middlewares/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = res.default;
            global[dep] = acc[dep];
            console.info(`[INFO] Dependency [${file}] loaded from [middlewares]`);
            return acc;
        }catch(e){
            console.error(`[Error] Unable to load ${file}`,e);
        }
    },{});
    return resolvedmiddlewares;
}

export default init;