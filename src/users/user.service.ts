import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { IUserService } from "./user";
import { CreateUserDetials, FindUserParams } from "src/utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/utils/typeorm";
import { Repository } from "typeorm";
import { hashPassword } from "src/utils/helpers";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}


  async createUser(userDetails: CreateUserDetials) {
    const findUser = await this.userRepository.findOne({
      email: userDetails.email,
    });

    if (findUser)
      throw new HttpException("User Already is exists", HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return await this.userRepository.findOne(findUserParams);
  }

  async saveUser(user:User){
    return this.userRepository.save(user);
  }
}
