"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
        this.message = message;
    }
    static badRequest(message) {
        return new CustomError(400, message);
    }
    static internalServer(message = "Internal Server Error") {
        return new CustomError(500, message);
    }
    static serverUnavailable(message = "Service Unavailable") {
        return new CustomError(503, message);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map