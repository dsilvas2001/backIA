"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class FunctionMapper {
    static userEntityFromObject(object) {
        const { _id, functionName } = object;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!functionName)
            throw custom_error_1.CustomError.badRequest("Missing course");
        return new domain_1.FunctionEntity(_id, functionName);
    }
}
exports.FunctionMapper = FunctionMapper;
