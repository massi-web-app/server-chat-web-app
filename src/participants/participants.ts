import { Participant } from "../utils/typeorm";
import { CreateParticipantParams, FindParticipantParams } from "../utils/types";

export interface IParticipantService{
  findParticipant(params:FindParticipantParams):Promise<Participant | null>;

  createParticipant(params:CreateParticipantParams):Promise<Participant>;

  findParticipantConversations(id:number  ):any;
}