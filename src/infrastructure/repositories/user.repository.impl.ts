import {
  UserDatasource,
  UserDto,
  UserEntity,
  UserRepository,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  register(userDto: UserDto): Promise<UserEntity> {
    return this.userDatasource.register(userDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDatasource.findAll();
  }
  async findById(userId: string): Promise<UserEntity> {
    return this.userDatasource.findById(userId);
  }

  async findByCredentials(
    email: string,
    password: string
  ): Promise<UserEntity> {
    return await this.userDatasource.findByCredentials(email, password);
  }
  async update(userId: string, updateDto: UserDto): Promise<UserEntity> {
    return this.userDatasource.update(userId, updateDto);
  }
}
