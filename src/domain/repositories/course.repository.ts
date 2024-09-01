import { CourseDto } from "../dtos/curso.dto";
import { CourseEntity } from "../entities/course.entity";

export abstract class CourseRepository {
  abstract register(courseDto: CourseDto): Promise<CourseEntity>;
  abstract findAll(): Promise<CourseEntity[]>;
}
