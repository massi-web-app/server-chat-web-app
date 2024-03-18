import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from "../utils/constants";
import { AuthenticateGuard } from "../auth/utils/Guards";
import { CreateConversationDto } from "./dto/CreateConversation.dto";
import { IConversationsService } from "./conversation";

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {

  constructor(@Inject(Services.COVNERSATIONS) private readonly conversationService:IConversationsService) {
  }
  @Post('/')
  createConversation(@Body() createConverastionPayload:CreateConversationDto){
    this.conversationService.createConversation(createConverastionPayload);
  }


}
