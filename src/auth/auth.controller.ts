import { Controller, Inject, Post, Get, Body, UseGuards, Req, Res, HttpStatus } from "@nestjs/common";
import { Routes, Services } from "src/utils/constants";
import { IAuthService } from "./auth";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { IUserService } from "src/users/user";
import { instanceToPlain } from "class-transformer";
import { AuthenticateGuard, LocalAuthGuard } from "./utils/Guards";
import { Request, Response } from "express";

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService
  ) {
  }

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    return res.send().status(HttpStatus.OK);
  }

  @Get("status")
  @UseGuards(AuthenticateGuard)
  status(@Req() req: Request, @Res() res: Response) {
    return res.send(req.user);
  }

  @Post("/logout")
  logout() {
  }
}
