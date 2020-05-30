class Response {
    static success = (res, data = null, statusCode = 200) => {
        res.status(statusCode).json({ error: false, data });
    }

    static error = (res, error = null, statusCode = 500) => {
        if (error) console.log(error);
        let messages = [];
        if ("errors" in error && error["errors"].length) {
            messages = error["errors"].reduce((acc, item) => {
                if (item.path && item.message) {
                    acc[item.path] = item.message;
                }
                return acc;
            }, {})
        }
        res.status(statusCode).json({ error: true, data: null, messages });
    }
}

module.exports = Response;