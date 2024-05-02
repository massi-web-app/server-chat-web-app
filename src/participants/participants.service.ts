import { Injectable } from '@nestjs/common';
import { IParticipantService } from "./participants";
import { Participant } from "../utils/typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateParticipantParams, FindParticipantParams } from "../utils/types";

@Injectable()
export class ParticipantsService implements IParticipantService{

  constructor(@InjectRepository(Participant) private readonly participantRepository:Repository<Participant>) {
  }

  findParticipant(params:FindParticipantParams): Promise<Participant | null> {
    return this.participantRepository.findOne(params);
  }

  createParticipant(params:CreateParticipantParams): Promise<Participant> {
    const participant=this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }

  async findParticipantConversations(id:number){
    return this.participantRepository
      .createQueryBuilder("participant")
      .leftJoinAndSelect("participant.conversations","conversation")
      .where("participant.id = :id",{id})
      .leftJoinAndSelect('conversation.participants','participants')
      .leftJoin('participants.user','user')
      .addSelect(['user.firstName','user.email','user.lastName','user.id'])
      .limit(2)
      .getOne();
  }
}
