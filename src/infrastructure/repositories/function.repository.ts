import {
  FunctionDatasource,
  FunctionDto,
  FunctionEntity,
  FunctionRepository,
} from "../../domain";

export class FunctionRepositoryImpl implements FunctionRepository {
  constructor(private readonly functionDatasource: FunctionDatasource) {}

  register(functionDto: FunctionDto): Promise<FunctionEntity> {
    return this.functionDatasource.register(functionDto);
  }

  async findAll(): Promise<FunctionEntity[]> {
    return this.functionDatasource.findAll();
  }
}
