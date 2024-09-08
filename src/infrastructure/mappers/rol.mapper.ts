import { RolEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class RolMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, rolName } = object;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!rolName) throw CustomError.badRequest("Missing rol");

    return new RolEntity(_id, rolName);
  }
}
