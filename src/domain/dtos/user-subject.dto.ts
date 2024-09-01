export class UserSubjectDto {
  private constructor(public userId: string, public subjectId: string) {}

  static create(object: { [key: string]: any }): [string?, UserSubjectDto?] {
    const { userId, subjectId } = object;

    // Validaciones básicas
    if (!userId) return ["Missing user ID"];
    if (!subjectId) return ["Missing subject ID"];

    return [undefined, new UserSubjectDto(userId, subjectId)];
  }
}
