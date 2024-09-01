import { UserFunctionEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

// export class UserFunctionMapper {
//   static userEntityFromObject(object: { [key: string]: any }) {
//     const { _id, userId, functionId } = object;
//     if (!_id) {
//       throw CustomError.badRequest("Missing id");
//     }
//     if (!userId) throw CustomError.badRequest("Missing userId");

//     if (!functionId) throw CustomError.badRequest("Missing functionId");

//     return new UserFunctionEntity(_id, userId, functionId);
//   }
// }

export class UserFunctionMapper {
  static userEntityFromObject(userFunction: any): UserFunctionEntity {
    const { _id, userId, functionId } = userFunction;
    if (!_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!userId) throw CustomError.badRequest("Missing userId");

    if (!functionId) throw CustomError.badRequest("Missing functionId");
    return {
      id: userFunction._id,
      userId: userFunction.userId._id,
      rolName: userFunction.userId.rolName, // Añade rolName
      functionId: userFunction.functionId._id,
      functionName: userFunction.functionId.functionName, // Añade functName
    };
  }
}
