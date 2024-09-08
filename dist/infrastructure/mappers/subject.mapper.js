"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectMapper = void 0;
const domain_1 = require("../../domain");
class SubjectMapper {
    static userEntityFromObject(subject) {
        return new domain_1.SubjectEntity(subject._id.toString(), subject.subjectName, subject.courseId._id.toString(), // Asegúrate de que `courseId` esté presente
        subject.courseId.courseName);
    }
}
exports.SubjectMapper = SubjectMapper;
