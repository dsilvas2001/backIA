"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(name, email, password, roles, courseName) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.courseName = courseName;
    }
    static create(object) {
        const { name, email, password, roles, courseName } = object;
        // Validaciones básicas
        if (!name)
            return ["Missing name"];
        if (!email)
            return ["Missing email"];
        if (!password)
            return ["Missing password"];
        if (!roles)
            return ["Missing rol"];
        if (!courseName)
            return ["Missing courseName"];
        if (password.length < 4)
            return ["Password too short"];
        return [undefined, new UserDto(name, email, password, roles, courseName)];
    }
    static update(object) {
        const { name, email } = object;
        // Validaciones básicas
        if (!name)
            return ["Missing name"];
        if (!email)
            return ["Missing email"];
        return [undefined, new UserDto(name, email)];
    }
}
exports.UserDto = UserDto;
