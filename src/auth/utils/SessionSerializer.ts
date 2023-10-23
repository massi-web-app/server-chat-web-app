import {Inject, Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import {Services} from 'src/utils/constants';
import {User} from 'src/utils/typeorm';
import {IUserService} from 'src/users/user';


@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userdb = await this.userService.findUser(user.id);
    return userdb ? done(null, userdb) : done(null, null);
  }
}
