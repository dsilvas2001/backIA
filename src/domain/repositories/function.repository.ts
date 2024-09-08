import { FunctionDto } from "../dtos/function.dto";
import { FunctionEntity } from "../entities/function.entity";

export abstract class FunctionRepository {
  abstract register(functionDto: FunctionDto): Promise<FunctionEntity>;

  abstract findAll(): Promise<FunctionEntity[]>;
}
