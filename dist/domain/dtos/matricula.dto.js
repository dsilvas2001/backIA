"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEnrollmentDto = void 0;
class StudentEnrollmentDto {
    constructor(studentId, courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }
    static create(object) {
        const { studentId, courseId } = object;
        // Validaciones básicas
        if (!studentId)
            return ["Missing student ID"];
        if (!courseId)
            return ["Missing course ID"];
        return [undefined, new StudentEnrollmentDto(studentId, courseId)];
    }
}
exports.StudentEnrollmentDto = StudentEnrollmentDto;
