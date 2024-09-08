import {
  studentEnrollmentDatasource,
  StudentEnrollmentDto,
  StudentEnrollmentEntity,
  StudentEnrollmentRepository,
} from "../../domain";

export class StudentEnrollmentRepositoryImpl
  implements StudentEnrollmentRepository
{
  constructor(
    private readonly studentenrollmentDatasource: studentEnrollmentDatasource
  ) {}

  register(
    studentEnrollmentDto: StudentEnrollmentDto
  ): Promise<StudentEnrollmentEntity> {
    return this.studentenrollmentDatasource.register(studentEnrollmentDto);
  }

  async findAll(): Promise<StudentEnrollmentEntity[]> {
    return this.studentenrollmentDatasource.findAll();
  }
}
