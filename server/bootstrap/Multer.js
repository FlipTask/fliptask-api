const multer = require("multer");
const util = require("util");
const path = require("path");

const init = () => {
    // console.log("[MULTER LOADED] >>>>>>");
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "../upload"));
        },
        filename: (req, file, callback) => {
            const match = ["image/png", "image/jpeg", "image/jpg"];

            if (match.indexOf(file.mimetype) === -1) {
                const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
                return callback(message, null);
            }
            const filename = `${Date.now()}-${req.query.taskId}-${file.originalname}`;
            return callback(null, filename);
        }
    });
    const upload = multer({ storage }).array("files");
    return util.promisify(upload);
};

module.exports = init;
