import { UserSubjectDto } from "../dtos/user-subject.dto";
import { UserSubjectEntity } from "../entities/user-subject.entity";

export abstract class UserSubjectRepository {
  abstract register(userSubjectDto: UserSubjectDto): Promise<UserSubjectEntity>;

  abstract findAll(): Promise<UserSubjectEntity[]>;
}
