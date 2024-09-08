import {
  CourseDatasource,
  CourseDto,
  CourseEntity,
  CourseRepository,
} from "../../domain";

export class CourseRepositoryImpl implements CourseRepository {
  constructor(private readonly courseDatasource: CourseDatasource) {}

  register(courseDto: CourseDto): Promise<CourseEntity> {
    return this.courseDatasource.register(courseDto);
  }
  async findAll(): Promise<CourseEntity[]> {
    return this.courseDatasource.findAll();
  }
}
