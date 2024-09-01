import { StudentEnrollmentMapper } from "./../mappers/matricula.mapper";
import mongoose from "mongoose";
import { CustomError } from "../errors/custom.error";
import {
  studentEnrollmentDatasource,
  StudentEnrollmentDto,
  StudentEnrollmentEntity,
} from "../../domain";
import { studentEnrollmentModel } from "../../data/mongodb/models/matricula.model";

export class StudentEnrollmentDatasourceImpl
  implements studentEnrollmentDatasource
{
  async register(
    studentEnrollmentDto: StudentEnrollmentDto
  ): Promise<StudentEnrollmentEntity> {
    const { studentId, courseId } = studentEnrollmentDto;

    try {
      const matricula = await studentEnrollmentModel.create({
        userId: studentId,
        courseId: courseId,
      });
      await matricula.save();

      // guardar
      return StudentEnrollmentMapper.userEntityFromObject(matricula);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<StudentEnrollmentEntity[]> {
    try {
      const enrollments = await studentEnrollmentModel.find();

      if (!enrollments.length) {
        throw CustomError.badRequest("No student enrollments found");
      }

      return enrollments.map((enrollment) =>
        StudentEnrollmentMapper.userEntityFromObject(enrollment)
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
