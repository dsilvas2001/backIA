import mongoose from "mongoose";
import { UserFunctionModel } from "../../data/mongodb/models/user-function.model";
import {
  UserFunctionDatasource,
  UserFunctionDto,
  UserFunctionEntity,
} from "../../domain";
import { CustomError } from "../errors/custom.error";
import { UserFunctionMapper } from "../mappers/user-function.mapper";

export class UserFunctionDatasourceImpl implements UserFunctionDatasource {
  async register(
    userFunctionDto: UserFunctionDto
  ): Promise<UserFunctionEntity> {
    const { userId, functionId } = userFunctionDto;

    try {
      const userFunction = await UserFunctionModel.create({
        userId: userId,
        functionId: functionId,
      });
      await userFunction.save();

      // guardar
      return UserFunctionMapper.userEntityFromObject(userFunction);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  // async findAll(): Promise<UserFunctionEntity[]> {
  //   try {
  //     const userFunction = await UserFunctionModel.find();

  //     if (!userFunction.length) {
  //       throw CustomError.badRequest("No  userFunction found");
  //     }

  //     return userFunction.map((userFunction) =>
  //       UserFunctionMapper.userEntityFromObject(userFunction)
  //     );
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     } else if (error instanceof mongoose.Error) {
  //       throw CustomError.serverUnavailable(error.message);
  //     } else {
  //       throw CustomError.internalServer();
  //     }
  //   }
  // }

  async findAll(): Promise<UserFunctionEntity[]> {
    try {
      const userFunctions = await UserFunctionModel.find()
        .populate("userId", "rolName") // Esto agrega el campo 'rolName' del modelo Rol
        .populate("functionId", "functionName"); // Esto agrega el campo 'functName' del modelo Function

      if (!userFunctions.length) {
        throw CustomError.badRequest("No userFunction found");
      }

      return userFunctions.map((userFunction) =>
        UserFunctionMapper.userEntityFromObject(userFunction)
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else if (error instanceof mongoose.Error) {
        throw CustomError.serverUnavailable(error.message);
      } else {
        throw CustomError.internalServer();
      }
    }
  }
}
