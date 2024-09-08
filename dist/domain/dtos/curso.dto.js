"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDto = void 0;
class CourseDto {
    constructor(courseName) {
        this.courseName = courseName;
    }
    static create(object) {
        const { courseName } = object;
        // Validaciones básicas
        if (!courseName)
            return ["Missing course name"];
        return [undefined, new CourseDto(courseName)];
    }
}
exports.CourseDto = CourseDto;
