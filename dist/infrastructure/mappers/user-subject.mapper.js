"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubjectMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class UserSubjectMapper {
    static userEntityFromObject(object) {
        const { _id, userId, subjectId } = object;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!userId)
            throw custom_error_1.CustomError.badRequest("Missing userId");
        if (!subjectId)
            throw custom_error_1.CustomError.badRequest("Missing subjectId");
        return new domain_1.UserSubjectEntity(_id, userId, subjectId);
    }
}
exports.UserSubjectMapper = UserSubjectMapper;
