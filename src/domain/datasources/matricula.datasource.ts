import { StudentEnrollmentDto } from "../dtos/matricula.dto";
import { StudentEnrollmentEntity } from "../entities/matricula.entity";

export abstract class studentEnrollmentDatasource {
  abstract register(
    studentEnrollmentDto: StudentEnrollmentDto
  ): Promise<StudentEnrollmentEntity>;

  abstract findAll(): Promise<StudentEnrollmentEntity[]>;
}
