import mongoose from "mongoose";
import { CustomError } from "../errors/custom.error";
import { CourseModel } from "../../data/mongodb/models/curso.model";
import {
  CourseDatasource,
  CourseDto,
  CourseEntity,
  CourseRepository,
} from "../../domain";
import { CourseMapper } from "../mappers/curso.mapper";

export class CourseDatasourceImpl implements CourseDatasource {
  async register(courseDto: CourseDto): Promise<CourseEntity> {
    const { courseName } = courseDto;

    try {
      // verificar si el correo existes
      const exists = await CourseModel.findOne({ courseName });
      if (exists) throw CustomError.badRequest("Course already exists");

      const course = await CourseModel.create({
        courseName: courseName,
      });
      await course.save();

      // guardar
      return CourseMapper.userEntityFromObject(course);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw CustomError.internalServer();
  }

  async findAll(): Promise<CourseEntity[]> {
    try {
      const courses = await CourseModel.find();

      if (!courses.length) {
        throw CustomError.badRequest("No courses found");
      }

      return courses.map((course) => CourseMapper.userEntityFromObject(course));
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
