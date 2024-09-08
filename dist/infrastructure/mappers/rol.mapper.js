"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class RolMapper {
    static userEntityFromObject(object) {
        const { _id, rolName } = object;
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("Missing id");
        }
        if (!rolName)
            throw custom_error_1.CustomError.badRequest("Missing rol");
        return new domain_1.RolEntity(_id, rolName);
    }
}
exports.RolMapper = RolMapper;
//# sourceMappingURL=rol.mapper.js.map