import { Controller, Inject, Post, Get, Body, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUserService } from 'src/users/user';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthgaurd } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthgaurd)
  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('/logout')
  logout() {}
}
