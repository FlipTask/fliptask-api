import Mongoose from "mongoose";

Mongoose.Promise = global.Promise;

const init = async() => {
    let dbHost = process.env.DB_HOST;
    let dbPort = process.env.DB_PORT;
    let dbName = process.env.DB_NAME;
    try {
        const db = await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        Logger.info('Connected to mongo!!!');
        global.Mongoose = db;
        global.Schema = db.Schema;
        return db;
    } catch (err) {
        console.log(err);
        Logger.error('Could not connect to MongoDB');
    }
}
export default init;