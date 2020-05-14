const loadDependency = async(type, dep, moduleObj) => {
    try{
        const res = await import(`./${type}/${dep}`);
        global[dep] = typeof(res.default) === "function" ? await res.default(moduleObj) : await res.default;
        moduleObj[dep] = global[dep];
        console.info(`[INFO] Dependency [${dep}] loaded from [${type}]`);
        return global[dep];
    }catch(e){
        console.error(`[Error] Unable to load ${dep}\n`,e);
    }
}
const configuration = {
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
    services: [
        "MailerService"
    ]
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
export const loadApp = async() => {
    await loadConfig();
}