import {
  UserFunctionDatasource,
  UserFunctionDto,
  UserFunctionEntity,
  UserFunctionRepository,
} from "../../domain";

export class UserFunctionRepositoryImpl implements UserFunctionRepository {
  constructor(
    private readonly userFunctionDatasource: UserFunctionDatasource
  ) {}

  register(userFunctionDto: UserFunctionDto): Promise<UserFunctionEntity> {
    return this.userFunctionDatasource.register(userFunctionDto);
  }

  async findAll(): Promise<UserFunctionEntity[]> {
    return this.userFunctionDatasource.findAll();
  }
}
