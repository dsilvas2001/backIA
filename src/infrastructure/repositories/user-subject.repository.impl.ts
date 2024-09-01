import {
  UserSubjectDatasource,
  UserSubjectDto,
  UserSubjectEntity,
  UserSubjectRepository,
} from "../../domain";

export class UserSubjectRepositoryImpl implements UserSubjectRepository {
  constructor(private readonly userSubjectDatasource: UserSubjectDatasource) {}

  register(userSubjectDto: UserSubjectDto): Promise<UserSubjectEntity> {
    return this.userSubjectDatasource.register(userSubjectDto);
  }

  async findAll(): Promise<UserSubjectEntity[]> {
    return this.userSubjectDatasource.findAll();
  }
}
