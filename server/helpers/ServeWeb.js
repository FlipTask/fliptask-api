import Renderer from "./Renderer";
import Routes from "./../../client/Routes";
import {
    matchRoutes
} from 'react-router-config';
import CreateStore from "./CreateStore";

export default (req,res,next) => {
    const store = CreateStore(req);
    const promises = matchRoutes(Routes, req.path).map(({
        route
    }) => {
        return route.loadData ? route.loadData(store,route,req.path,req.query,req.params) : null;
    }).map((promise) => {
        if (promise) {
                return new Promise((resolve, reject) => {
                    Promise.all(promise).then((value) => {
                        resolve(value);
                    });
                });
        }
    });
    Promise.all(promises).then(() => {
        const context = {};
        // console.log("content");
        Renderer(req, store, context).then((content) => {
            // console.log("content --->",content)
            if (context.url) {
                return res.redirect(301, context.url);
            }

            if (context.notFound) {
                res.status(404);
            }

            res.send(content);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
}