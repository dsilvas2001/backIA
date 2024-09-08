"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class CourseMapper {
    static userEntityFromObject(object) {
        const { _id, courseName } = object;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!courseName)
            throw custom_error_1.CustomError.badRequest("Missing course");
        return new domain_1.CourseEntity(_id, courseName);
    }
}
exports.CourseMapper = CourseMapper;
