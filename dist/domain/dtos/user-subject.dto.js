"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubjectDto = void 0;
class UserSubjectDto {
    constructor(userId, subjectId) {
        this.userId = userId;
        this.subjectId = subjectId;
    }
    static create(object) {
        const { userId, subjectId } = object;
        // Validaciones básicas
        if (!userId)
            return ["Missing user ID"];
        if (!subjectId)
            return ["Missing subject ID"];
        return [undefined, new UserSubjectDto(userId, subjectId)];
    }
}
exports.UserSubjectDto = UserSubjectDto;
