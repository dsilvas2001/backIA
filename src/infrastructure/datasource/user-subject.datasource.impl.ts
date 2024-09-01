import mongoose from "mongoose";
import { userSubjectModel } from "../../data/mongodb/models/user-subject.model";
import {
  UserSubjectDatasource,
  UserSubjectDto,
  UserSubjectEntity,
} from "../../domain";
import { CustomError } from "../errors/custom.error";
import { UserSubjectMapper } from "../mappers/user-subject.mapper";

export class UserSubjectImpl implements UserSubjectDatasource {
  async register(userSubjectDto: UserSubjectDto): Promise<UserSubjectEntity> {
    const { userId, subjectId } = userSubjectDto;

    try {
      const userSubject = await userSubjectModel.create({
        userId: userId,
        functionId: subjectId,
      });
      await userSubject.save();

      // guardar
      return UserSubjectMapper.userEntityFromObject(userSubject);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<UserSubjectEntity[]> {
    try {
      const userSubject = await userSubjectModel.find();

      if (!userSubject.length) {
        throw CustomError.badRequest("No  userSubject found");
      }

      return userSubject.map((userSubject) =>
        UserSubjectMapper.userEntityFromObject(userSubject)
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
