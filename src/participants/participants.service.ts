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

  async findParticipantConversations(){
    return this.participantRepository.createQueryBuilder("participant")
      .leftJoinAndSelect("participant.conversations","conversation")
      .where("participant.id = :id",{id:1})
      .getOne();
  }
}
