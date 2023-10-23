import { FindUserParams, ValidateUserDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredentinals: ValidateUserDetails);
}
