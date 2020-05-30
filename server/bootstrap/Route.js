const fs = require("fs");
const Path = require("path");
const express = require("express");

const convertHandlersStringToFunction = async (handlers) => {
    const splitHandlers = handlers.split(".");
    return splitHandlers.length > 1 ? global[splitHandlers[0]][splitHandlers[1]] : global[splitHandlers[0]];
};


const convertObjectToRoutes = async (router, {
    type = "GET", path, handlers = []
}) => {
    if (!path && !handlers) {
        return false;
    }
    const method = type.toLowerCase();
    let h;
    if (typeof handlers === "string") {
        h = await convertHandlersStringToFunction(handlers);
    } else if (typeof handlers === "object" && handlers.length) { // ARRAY
        h = [];
        for (let i = 0; i < handlers.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            const newH = await convertHandlersStringToFunction(handlers[i]);
            h.push(newH);
        }
    } else {
        return new Error("Only String and Array types are possible for handlers in Routes");
    }


    return router[method](path, h);
};

const createRouter = async (routeName, routes = []) => {
    if (!routeName) {
        return new Error(`[ERROR] can't accept routeName as ${routeName}`);
    }

    const parentRouter = express.Router({
        mergeParams: true
    });
    const router = express.Router({
        mergeParams: true
    });

    for (let i = 0; i < routes.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await convertObjectToRoutes(router, routes[i]);
    }
    return parentRouter.use(`/${routeName}`, router);
};

const init = async () => {
    const routes = fs.readdirSync(Path.resolve(__dirname, "../routes"));
    const allRoutes = [];
    for (let i = 0; i < routes.length; i++) {
        const file = routes[i];
        try {
            // eslint-disable-next-line no-await-in-loop
            const res = await require(`../routes/${file}`);
            const dep = file.split(".")[0];
            // eslint-disable-next-line no-await-in-loop
            const router = await createRouter(dep, res);
            allRoutes.push({
                routeName: `${dep}Routes`,
                basePath: `/${dep.toLowerCase()}`,
                router
            });
            // console.info(`[INFO] Dependency [${file}] loaded from [routes]`);
        } catch (e) {
            console.error(`[Error] Unable to load ${file}`, e);
        }
    }

    return allRoutes;
};

module.exports = init;
