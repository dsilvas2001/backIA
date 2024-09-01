import { SubjectDto } from "../dtos/subject.dto";
import { SubjectEntity } from "../entities/subject.entity";

export abstract class SubjectDatasource {
  abstract register(studentEnrollmentDto: SubjectDto): Promise<SubjectEntity>;

  abstract findAll(): Promise<SubjectEntity[]>;
}
