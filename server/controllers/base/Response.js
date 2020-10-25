class Response {
    static success = (res, data = null, statusCode = 200) => {
        res.status(statusCode).json({ error: false, data });
    }

    static error = (res, error = null, statusCode = 500) => {
        console.log("{ERROR}", error);
        let messages = {};
        const response = {
            error: true,
            data: null
        };
        if (error instanceof Error) {
            messages["error"] = error.message;
        } else if (error && "errors" in error && error["errors"].length) {
            messages = error["errors"].reduce((acc, item) => {
                if (item.path && item.message) {
                    acc[item.path] = item.message;
                }
                return acc;
            }, {})
        }
        response.messages = messages;
        if(error && error.next) {
            response.next = error.next;
        }
        res.status(statusCode).json(response);
    }
}

module.exports = Response;