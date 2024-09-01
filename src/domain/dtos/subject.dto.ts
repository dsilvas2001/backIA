export class SubjectDto {
  private constructor(public subjectName: string, public courseId: string) {}

  static create(object: { [key: string]: any }): [string?, SubjectDto?] {
    const { subjectName, courseId } = object;

    // Validaciones básicas
    if (!subjectName) return ["Missing subject ID"];
    if (!courseId) return ["Missing course ID"];

    return [undefined, new SubjectDto(subjectName, courseId)];
  }
}
