import { UserFunctionDto } from "../dtos/user-function.dto";
import { UserFunctionEntity } from "../entities/user-function.entity";

export abstract class UserFunctionDatasource {
  abstract register(
    studentEnrollmentDto: UserFunctionDto
  ): Promise<UserFunctionEntity>;

  abstract findAll(): Promise<UserFunctionEntity[]>;
}
