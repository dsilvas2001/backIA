export class UserDto {
  private constructor(
    public name: string,
    public email: string,
    public password?: string,
    public roles?: string,
    public courseName?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserDto?] {
    const { name, email, password, roles, courseName } = object;

    // Validaciones básicas
    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (!roles) return ["Missing rol"];
    if (!courseName) return ["Missing courseName"];
    if (password.length < 4) return ["Password too short"];

    return [undefined, new UserDto(name, email, password, roles, courseName)];
  }
  static update(object: { [key: string]: any }): [string?, UserDto?] {
    const { name, email } = object;

    // Validaciones básicas
    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];

    return [undefined, new UserDto(name, email)];
  }
}
