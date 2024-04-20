import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IConversationsService } from "./conversation";
import { Services } from "../utils/constants";
import { CreateConversationParams } from "../utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation, User } from "../utils/typeorm";
import { Repository } from "typeorm";
import { IParticipantService } from "../participants/participants";
import { IUserService } from "../users/user";

@Injectable()
export class ConversationsService implements IConversationsService {


  constructor(
    @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS) private readonly participantService: IParticipantService,
    @Inject(Services.USERS) private readonly userService: IUserService
  ) {

  }

  async createConversation(user: User, params: CreateConversationParams) {
    const userDB = await this.userService.findUser({ id: user.id });

    if (!userDB.participant) {
      const newParticiant = await this.participantService.createParticipant({ id: params.authorId });
      userDB.participant = newParticiant;
      await this.userService.saveUser(userDB);
    }


    const recipient = await this.userService.findUser({ id: params.recipientId });

    if (!recipient) throw new HttpException("Cannot Create Conversation",HttpStatus.BAD_REQUEST)
    if (!recipient.participant){
      const newParticiant = await this.participantService.createParticipant({ id: params.recipientId });
      recipient.participant = newParticiant;
      await this.userService.saveUser(recipient);
    }
  }

}
