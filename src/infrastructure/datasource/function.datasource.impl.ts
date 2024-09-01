import mongoose from "mongoose";
import { CustomError } from "../errors/custom.error";

import { FunctionDatasource, FunctionDto, FunctionEntity } from "../../domain";
import { FunctionModel } from "../../data/mongodb/models/function.model";
import { FunctionMapper } from "../mappers/function.mapper";

export class FunctionDatasourceImpl implements FunctionDatasource {
  async register(functionDto: FunctionDto): Promise<FunctionEntity> {
    const { functionName } = functionDto;

    try {
      // verificar si el correo existes
      const exists = await FunctionModel.findOne({ functionName });
      if (exists) throw CustomError.badRequest("functions already exists");

      const functions = await FunctionModel.create({
        functionName: functionName,
      });
      await functions.save();

      // guardar
      return FunctionMapper.userEntityFromObject(functions);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<FunctionEntity[]> {
    try {
      const functions = await FunctionModel.find();

      if (!functions.length) {
        throw CustomError.badRequest("No functions found");
      }

      return functions.map((func) => FunctionMapper.userEntityFromObject(func));
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
