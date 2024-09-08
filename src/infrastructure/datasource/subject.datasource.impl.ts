import mongoose from "mongoose";
import { SubjectModel } from "../../data/mongodb/models/subject.model";
import { SubjectDatasource, SubjectDto, SubjectEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";
import { SubjectMapper } from "../mappers/subject.mapper";

export class SubjectDatasourceImpl implements SubjectDatasource {
  async register(subjectDto: SubjectDto): Promise<SubjectEntity> {
    const { subjectName, courseId } = subjectDto;

    try {
      const subject = await SubjectModel.create({
        subjectName: subjectName,
        courseId: courseId,
      });
      await subject.save();

      // guardar
      return SubjectMapper.userEntityFromObject(subject);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<SubjectEntity[]> {
    try {
      const subjects = await SubjectModel.find().populate(
        "courseId",
        "courseName"
      );

      if (!subjects.length) {
        throw CustomError.badRequest("No subject found");
      }

      return subjects.map((userFunction) =>
        SubjectMapper.userEntityFromObject(userFunction)
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
