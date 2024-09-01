export class StudentEnrollmentDto {
  private constructor(public studentId: string, public courseId: string) {}

  static create(object: {
    [key: string]: any;
  }): [string?, StudentEnrollmentDto?] {
    const { studentId, courseId } = object;

    // Validaciones básicas
    if (!studentId) return ["Missing student ID"];
    if (!courseId) return ["Missing course ID"];

    return [undefined, new StudentEnrollmentDto(studentId, courseId)];
  }
}
