import { CourseEntity, StudentEnrollmentEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class StudentEnrollmentMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, userId, courseId } = object;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!userId) throw CustomError.badRequest("Missing userId");

    if (!courseId) throw CustomError.badRequest("Missing courseId");

    return new StudentEnrollmentEntity(_id, userId, courseId);
  }
}
