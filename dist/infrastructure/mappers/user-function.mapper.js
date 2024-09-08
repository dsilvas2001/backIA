"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunctionMapper = void 0;
const custom_error_1 = require("../errors/custom.error");
class UserFunctionMapper {
    static userEntityFromObject(userFunction) {
        const { _id, userId, functionId } = userFunction;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!userId)
            throw custom_error_1.CustomError.badRequest("Missing userId");
        if (!functionId)
            throw custom_error_1.CustomError.badRequest("Missing functionId");
        return {
            id: userFunction._id,
            userId: userFunction.userId._id,
            rolName: userFunction.userId.rolName, // Añade rolName
            functionId: userFunction.functionId._id,
            functionName: userFunction.functionId.functionName, // Añade functName
        };
    }
}
exports.UserFunctionMapper = UserFunctionMapper;
//
//# sourceMappingURL=user-function.mapper.js.map