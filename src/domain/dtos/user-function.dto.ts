export class UserFunctionDto {
  private constructor(public userId: string, public functionId: string) {}

  static create(object: { [key: string]: any }): [string?, UserFunctionDto?] {
    const { userId, functionId } = object;

    // Validaciones básicas
    if (!userId) return ["Missing user ID"];
    if (!functionId) return ["Missing function ID"];

    return [undefined, new UserFunctionDto(userId, functionId)];
  }
}
