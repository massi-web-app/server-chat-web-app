import { CreateConversationParams } from "../utils/types";
import { Conversation, User } from "../utils/typeorm";

export interface IConversationsService{
  createConversation(user:User,conversationParams:CreateConversationParams):any

  getConversations(id: number): Promise<Conversation[]>;

  findConversationById(id:number):Promise<Conversation>;

}