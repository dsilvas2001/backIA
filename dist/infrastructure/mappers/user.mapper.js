"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
const custom_error_1 = require("../errors/custom.error");
class UserMapper {
    static userEntityFromObject(object) {
        const { _id, name, email, password, roles, courseName } = object;
        // Validaciones básicas con mensajes de error claros
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("User entity requires an ID");
        }
        if (!name) {
            throw custom_error_1.CustomError.badRequest("User entity requires a name");
        }
        if (!email) {
            throw custom_error_1.CustomError.badRequest("User entity requires an email");
        }
        if (!password) {
            throw custom_error_1.CustomError.badRequest("User entity requires a password");
        }
        if (!roles) {
            throw custom_error_1.CustomError.badRequest("User entity requires roles");
        }
        if (!courseName) {
            throw custom_error_1.CustomError.badRequest("User entity requires courseName");
        }
        // Crear y devolver la entidad de usuario
        return new domain_1.UserEntity(_id.toString(), name, email, password, roles.toString(), courseName);
    }
    static userUpdateEntityFromObject(object) {
        const { _id, name, email } = object;
        // Validaciones básicas con mensajes de error claros
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("User entity requires an ID");
        }
        if (!name) {
            throw custom_error_1.CustomError.badRequest("User entity requires a name");
        }
        if (!email) {
            throw custom_error_1.CustomError.badRequest("User entity requires an email");
        }
        // Crear y devolver la entidad de usuario
        return new domain_1.UserEntity(_id.toString(), name, email);
    }
    static userAuthEntityFromObject(object) {
        const { _id, email, password } = object;
        // Validaciones básicas con mensajes de error claros
        if (!_id) {
            throw custom_error_1.CustomError.badRequest("User entity requires an ID");
        }
        if (!password) {
            throw custom_error_1.CustomError.badRequest("User entity requires a password");
        }
        if (!email) {
            throw custom_error_1.CustomError.badRequest("User entity requires an email");
        }
        // Crear y devolver la entidad de usuario
        return new domain_1.UserEntity(_id.toString(), undefined, email, password);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map