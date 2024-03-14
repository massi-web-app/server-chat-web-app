import { HttpException, Inject, Injectable, HttpStatus } from "@nestjs/common";
import { IAuthService } from "./auth";
import { Services } from "src/utils/constants";
import { IUserService } from "src/users/user";
import { FindUserParams, ValidateUserDetails } from "src/utils/types";
import { compareHash } from "src/utils/helpers";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService
  ) {
  }

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({
      email: userDetails.email
    });

    if (!user)
      throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);

    const passwordIsValid =await  compareHash(userDetails.password, user.password);

    return passwordIsValid ? user : null;
  }
}
