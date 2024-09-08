"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunctionDto = void 0;
class UserFunctionDto {
    constructor(userId, functionId) {
        this.userId = userId;
        this.functionId = functionId;
    }
    static create(object) {
        const { userId, functionId } = object;
        // Validaciones básicas
        if (!userId)
            return ["Missing user ID"];
        if (!functionId)
            return ["Missing function ID"];
        return [undefined, new UserFunctionDto(userId, functionId)];
    }
}
exports.UserFunctionDto = UserFunctionDto;
//# sourceMappingURL=user-function.dto.js.map