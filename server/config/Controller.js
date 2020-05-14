import * as fs from "fs";
import Path from "path";

const init = async() => {
    const controllers = fs.readdirSync(Path.resolve(__dirname,"../server/controllers"));
    const resolvedcontrollers = await controllers.reduce(async(acc,file) => {
        try{
            const res = await import(`./../controllers/${file}`);
            const dep = file.split(".")[0];
            acc[dep] = res.default;
            global[dep] = acc[dep];
            console.info(`[INFO] Dependency [${file}] loaded from [controllers]`);
            return acc;
        }catch(e){
            console.error(`[Error] Unable to load ${file}`,e);
        }
    },{});
    return resolvedcontrollers;
}

export default init;