import { UserEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { _id, name, email, password, roles, courseName } = object;

    // Validaciones básicas con mensajes de error claros
    if (!_id) {
      throw CustomError.badRequest("User entity requires an ID");
    }
    if (!name) {
      throw CustomError.badRequest("User entity requires a name");
    }
    if (!email) {
      throw CustomError.badRequest("User entity requires an email");
    }
    if (!password) {
      throw CustomError.badRequest("User entity requires a password");
    }
    if (!roles) {
      throw CustomError.badRequest("User entity requires roles");
    }
    if (!courseName) {
      throw CustomError.badRequest("User entity requires courseName");
    }

    // Crear y devolver la entidad de usuario
    return new UserEntity(
      _id.toString(),
      name,
      email,
      password,
      roles.toString(),
      courseName
    );
  }
  static userUpdateEntityFromObject(object: {
    [key: string]: any;
  }): UserEntity {
    const { _id, name, email } = object;

    // Validaciones básicas con mensajes de error claros
    if (!_id) {
      throw CustomError.badRequest("User entity requires an ID");
    }
    if (!name) {
      throw CustomError.badRequest("User entity requires a name");
    }
    if (!email) {
      throw CustomError.badRequest("User entity requires an email");
    }

    // Crear y devolver la entidad de usuario
    return new UserEntity(_id.toString(), name, email);
  }
  static userAuthEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { _id, email, password } = object;

    // Validaciones básicas con mensajes de error claros
    if (!_id) {
      throw CustomError.badRequest("User entity requires an ID");
    }
    if (!password) {
      throw CustomError.badRequest("User entity requires a password");
    }
    if (!email) {
      throw CustomError.badRequest("User entity requires an email");
    }

    // Crear y devolver la entidad de usuario
    return new UserEntity(_id.toString(), email, password);
  }
}
