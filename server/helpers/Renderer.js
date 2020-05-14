import React from "react";
import path from "path";
import { renderToString } from "react-dom/server"
import { ChunkExtractor } from "@loadable/server"
import {Provider} from "react-redux";
import {StaticRouter} from "react-router";
// import Routes from "./../../client/Routes";
// import {renderRoutes} from "react-router-config";
import App from "./../../client/App";
const webStats = path.resolve(__dirname,"./../client-build/loadable-stats.json");
const entryPoints = require("./../../webpack/EntryPoints");

export default (req, store, context) => {
    return new Promise((resolve,reject) => {
        const InitialComponent = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const webExtractor = new ChunkExtractor({statsFile: webStats, entrypoints: ["main"]});
        
        const JSX = webExtractor.collectChunks(InitialComponent);
        const html = renderToString(JSX);
        // console.log("html",html);
        const page =  `
            <html lang="en">
                <head>
                    <base href="/" />
                    <meta charset="utf-8">
                    <meta name="msapplication-TileColor" content="#ffffff">
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
                    <meta name="theme-color" content="#ffffff">
                    <link rel="shortcut icon" type="image/x-icon" href="/static/icon/favicon.ico">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    ${webExtractor.getLinkTags()}
                    ${webExtractor.getStyleTags()}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
                        rel="stylesheet">
                    <link
                        href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap"
                        rel="stylesheet">
                </head>
                <body style="margin:0px">
                    <script>
                        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
                    </script>
                    <section id="root">${html}</section>
                    <section id="root-modal"></section>
                    ${webExtractor.getScriptTags()}
                    <script src="https://kit.fontawesome.com/179049e472.js" crossorigin="anonymous" async></script>
                </body>
            </html>
        `;
        resolve(page);
    }).catch(err => {
        console.log("------------ERROR IN RENDERER------------------");
        throw err;
    })
};
{/* <script>
window.INITIAL_STATE = ${serialize(store.getState())}
</script> */}

{/* <script>
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/myServiceWorker.js")
    .then(function(registration) {
      console.log("##Service Worker##  Service Worker registration successful with scope: ",
      registration.scope);
    })
    .catch(function(err) {
      console.log("##Service Worker##  Service Worker registration failed: ", err);
    });
}
</script> */}