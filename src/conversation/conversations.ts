import { CreateConversationParams } from "../utils/types";
import { Conversation, User } from "../utils/typeorm";

export interface IConversationsService{
  createConversation(user:User,conversationParams:CreateConversationParams):any

  find():Promise<Conversation[]>
}