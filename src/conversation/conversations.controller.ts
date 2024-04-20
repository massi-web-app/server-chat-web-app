import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from "../utils/constants";
import { AuthenticateGuard } from "../auth/utils/Guards";
import { CreateConversationDto } from "./dto/CreateConversation.dto";
import { IConversationsService } from "./conversation";
import { User } from "../utils/typeorm";
import { AuthUser } from "../utils/decorators";
import { IUserService } from "../users/user";

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {

  constructor(
    @Inject(Services.COVNERSATIONS) private readonly conversationService: IConversationsService,
  ) {
  }

  @Post("/")
  async createConversation(@AuthUser() user: User, @Body() createConverastionPayload: CreateConversationDto) {
    return this.conversationService.createConversation(user,createConverastionPayload);
  }


}
