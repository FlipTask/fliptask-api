class FliptaskError extends Error {
    static permissionDenied(message = "Permission Denied") {
        return new FliptaskError(message);
    }

    static missingParams(message = "Missing Parameters") {
        return new FliptaskError(message);
    }

    static serverError(message = "Oops something went wrong") {
        return new FliptaskError(message);
    }
}

global.FliptaskError = FliptaskError;