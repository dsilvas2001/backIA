"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionDto = void 0;
class FunctionDto {
    constructor(functionName) {
        this.functionName = functionName;
    }
    static create(object) {
        const { functionName } = object;
        // Validaciones básicas
        if (!functionName)
            return ["Missing function name"];
        return [undefined, new FunctionDto(functionName)];
    }
}
exports.FunctionDto = FunctionDto;
//# sourceMappingURL=function.dto.js.map