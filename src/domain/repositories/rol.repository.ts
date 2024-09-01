import { RolDto } from "../dtos/rol.dto";
import { RolEntity } from "../entities/rol.entity";

export abstract class RolRepository {
  abstract register(rolDto: RolDto): Promise<RolEntity>;
  abstract findAll(): Promise<RolEntity[]>;
}
