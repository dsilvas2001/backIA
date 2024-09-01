import { SubjectDto } from "../dtos/subject.dto";
import { SubjectEntity } from "../entities/subject.entity";

export abstract class SubjectRepository {
  abstract register(subjectDto: SubjectDto): Promise<SubjectEntity>;

  abstract findAll(): Promise<SubjectEntity[]>;
}
