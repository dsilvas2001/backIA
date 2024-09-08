"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolDto = void 0;
class RolDto {
    constructor(rolName) {
        this.rolName = rolName;
    }
    static create(object) {
        const { rolName } = object;
        // Validaciones básicas
        if (!rolName)
            return ["Missing rol name"];
        return [undefined, new RolDto(rolName)];
    }
}
exports.RolDto = RolDto;
