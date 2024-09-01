export class RolDto {
  private constructor(public rolName: string) {}

  static create(object: { [key: string]: any }): [string?, RolDto?] {
    const { rolName } = object;

    // Validaciones básicas
    if (!rolName) return ["Missing rol name"];

    return [undefined, new RolDto(rolName)];
  }
}
