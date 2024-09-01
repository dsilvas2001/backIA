import { UserFunctionDto } from "../dtos/user-function.dto";
import { UserFunctionEntity } from "../entities/user-function.entity";

export abstract class UserFunctionRepository {
  abstract register(
    userFunctionDto: UserFunctionDto
  ): Promise<UserFunctionEntity>;

  abstract findAll(): Promise<UserFunctionEntity[]>;
}
