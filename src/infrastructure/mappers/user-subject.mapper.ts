import { UserSubjectEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class UserSubjectMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, userId, subjectId } = object;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!userId) throw CustomError.badRequest("Missing userId");

    if (!subjectId) throw CustomError.badRequest("Missing subjectId");

    return new UserSubjectEntity(_id, userId, subjectId);
  }
}
