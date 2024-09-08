"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEnrollmentMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class StudentEnrollmentMapper {
    static userEntityFromObject(object) {
        const { _id, userId, courseId } = object;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!userId)
            throw custom_error_1.CustomError.badRequest("Missing userId");
        if (!courseId)
            throw custom_error_1.CustomError.badRequest("Missing courseId");
        return new domain_1.StudentEnrollmentEntity(_id, userId, courseId);
    }
}
exports.StudentEnrollmentMapper = StudentEnrollmentMapper;
//# sourceMappingURL=matricula.mapper.js.map