import { CourseEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class CourseMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, courseName } = object;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!courseName) throw CustomError.badRequest("Missing course");

    return new CourseEntity(_id, courseName);
  }
}
