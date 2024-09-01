import { RolDatasource, RolDto, RolEntity, RolRepository } from "../../domain";

export class RolRepositoryImpl implements RolRepository {
  constructor(private readonly rolDatasource: RolDatasource) {}

  register(courseDto: RolDto): Promise<RolEntity> {
    return this.rolDatasource.register(courseDto);
  }
  async findAll(): Promise<RolEntity[]> {
    return this.rolDatasource.findAll();
  }
}
