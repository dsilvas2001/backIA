import mongoose from "mongoose";
import { RolModel } from "../../data/mongodb/models/rol.model";
import { RolDatasource, RolDto, RolEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";
import { RolMapper } from "../mappers/rol.mapper";

export class RolDatasourceImpl implements RolDatasource {
  async register(rolDto: RolDto): Promise<RolEntity> {
    const { rolName } = rolDto;

    try {
      // verificar si el correo existes
      const exists = await RolModel.findOne({ rolName });
      if (exists) throw CustomError.badRequest("Rol already exists");

      const rol = await RolModel.create({
        rolName: rolName,
      });
      await rol.save();

      // guardar
      return RolMapper.userEntityFromObject(rol);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<RolEntity[]> {
    try {
      const rols = await RolModel.find();

      if (!rols.length) {
        throw CustomError.badRequest("No rols found");
      }

      return rols.map((rol) => RolMapper.userEntityFromObject(rol));
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
