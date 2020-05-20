const express = require("express");
const Path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const init = async(moduleObj) => {
    const app = express();
    
    app.use('/assets/', express.static(Path.resolve(__dirname,"./../assets")));
    app.use('/images/', express.static(Path.resolve(__dirname,"./../upload")));
    
    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    
    for(let i = 0 ; i < moduleObj.Route.length ; i++){
        const route = moduleObj.Route[i];
        app.use("/api",route.router);
    }
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening to ${PORT}....`)
        console.log('Press Ctrl+C to quit.')
    });   
}

module.exports = init;