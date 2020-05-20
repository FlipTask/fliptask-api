const path = require("path");
const env = process.env.NODE_ENV === "production" ? "prod.env" : "dev.env";
require('dotenv').config({ 
    path: path.resolve(__dirname, `../env/${env}`)
});

const loadDependency = async(type, dep, moduleObj) => {
    try{
        const res = await require(`./${type}/${dep}`);
        global[dep] = typeof(res) === "function" ? await res(moduleObj) : await res;
        moduleObj[dep] = global[dep];
        console.info(`[INFO] Dependency [${dep}] loaded from [${type}]`);
        return global[dep];
    }catch(e){
        console.error(`[Error] Unable to load ${dep}\n`,e);
    }
}
const configuration = {
    services: [
        "MailerService"
    ],
    config: [
        "Multer",
        "Mailer",
        "Logger",
        "DB",
        "Model",
        "Middleware",
        "Controller",
        "Route",
        "Express",
    ],
}
const loadConfig = async() => {  
    let moduleObj = {};
    const typeList = Object.keys(configuration);
    for(let i = 0 ; i < typeList.length; i++){
        const type = typeList[i];
        console.log("[#################################******** Loading "+type+" *********#################################]")
        for(let j = 0 ; j < configuration[type].length ; j++){
            const name = configuration[type][j];
            await loadDependency(type,name,moduleObj);
        }
    }
}
const loadApp = async() => {
    await loadConfig();
}

module.exports = {
    loadApp,
    loadConfig,
    loadDependency
}