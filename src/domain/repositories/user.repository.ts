import { UserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract register(userdto: UserDto): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findById(userId: string): Promise<UserEntity>;
  abstract findByCredentials(
    email: string,
    password: string
  ): Promise<UserEntity>;
  abstract update(userId: string, userUpdateDto: UserDto): Promise<UserEntity>;
}
