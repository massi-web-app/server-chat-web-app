import { CreateUserDetials } from 'src/utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetials);
}
