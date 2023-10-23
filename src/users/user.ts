import { User } from 'src/utils/typeorm';
import { CreateUserDetials, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetials): Promise<User>;

  findUser(findUserParams: FindUserParams): Promise<User>;
}
