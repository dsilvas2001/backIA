"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectDto = void 0;
class SubjectDto {
    constructor(subjectName, courseId) {
        this.subjectName = subjectName;
        this.courseId = courseId;
    }
    static create(object) {
        const { subjectName, courseId } = object;
        // Validaciones básicas
        if (!subjectName)
            return ["Missing subject ID"];
        if (!courseId)
            return ["Missing course ID"];
        return [undefined, new SubjectDto(subjectName, courseId)];
    }
}
exports.SubjectDto = SubjectDto;
