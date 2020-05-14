const multer = require("multer");
const util = require("util");
const path = require("path");

const init = () => {
    console.log("[MULTER LOADED] >>>>>>");
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname,`../upload`));
        },
        filename: (req, file, callback) => {
            const match = ["image/png", "image/jpeg", "image/jpg"];
    
            if (match.indexOf(file.mimetype) === -1) {
                var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
                return callback(message, null);
            }
            var filename = `${Date.now()}-${req.query.taskId}-${file.originalname}`;
            callback(null, filename);
        }
    });
    const upload = multer({storage: storage}).array("files");
    return util.promisify(upload);
}

export default init;