import { FunctionEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class FunctionMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, functionName } = object;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!functionName) throw CustomError.badRequest("Missing course");

    return new FunctionEntity(_id, functionName);
  }
}
