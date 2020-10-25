class FliptaskError extends Error {
    constructor(error) {
        if(typeof error === "string") {
            super(error);
        }
        if(error instanceof Object) {
            super(error.message);
            if(error && error.next) {
                this.next = error.next;
            }
        }
        this.name = "FlipTaskError";
    }
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