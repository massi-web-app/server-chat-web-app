import { Inject, Injectable } from "@nestjs/common";
import { IConversationsService } from "./conversation";
import { Services } from "../utils/constants";
import { CreateConversationParams } from "../utils/types";

@Injectable()
export class ConversationsService implements IConversationsService{


  createConversation(conversationParams:CreateConversationParams) {

  }

}
