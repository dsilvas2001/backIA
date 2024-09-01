export class CourseDto {
  private constructor(public courseName: string) {}

  static create(object: { [key: string]: any }): [string?, CourseDto?] {
    const { courseName } = object;

    // Validaciones básicas
    if (!courseName) return ["Missing course name"];

    return [undefined, new CourseDto(courseName)];
  }
}
