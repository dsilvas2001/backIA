import {
  SubjectDatasource,
  SubjectDto,
  SubjectEntity,
  SubjectRepository,
} from "../../domain";

export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(private readonly subjectDatasource: SubjectDatasource) {}

  register(subjectDto: SubjectDto): Promise<SubjectEntity> {
    return this.subjectDatasource.register(subjectDto);
  }

  async findAll(): Promise<SubjectEntity[]> {
    return this.subjectDatasource.findAll();
  }
}
