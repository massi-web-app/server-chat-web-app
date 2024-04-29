import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from "../utils/constants";
import { AuthenticateGuard } from "../auth/utils/Guards";
import { CreateConversationDto } from "./dto/CreateConversation.dto";
import { IConversationsService } from "./conversations";
import { User } from "../utils/typeorm";
import { AuthUser } from "../utils/decorators";
import { IUserService } from "../users/user";

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {

  constructor(
    @Inject(Services.CONVERSATIONS) private readonly conversationService: IConversationsService
  ) {
  }

  @Post("/")
  async createConversation(@AuthUser() user: User, @Body() createConverastionPayload: CreateConversationDto) {
    return this.conversationService.createConversation(user, createConverastionPayload);
  }


  @Get("/")
  async getConversations(@AuthUser() user: User) {
    const participant = await this.conversationService.find(user.id);

    return participant;
  }


  @Get(":id")
  async getConversationById(@Param("id") id: number) {
    return await this.conversationService.findConversationById(id);
  }
}
