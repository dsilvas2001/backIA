export class FunctionDto {
  private constructor(public functionName: string) {}

  static create(object: { [key: string]: any }): [string?, FunctionDto?] {
    const { functionName } = object;
    // Validaciones básicas
    if (!functionName) return ["Missing function name"];

    return [undefined, new FunctionDto(functionName)];
  }
}
