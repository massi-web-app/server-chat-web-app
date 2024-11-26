import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IMessageService } from "./message";
import { Conversation, Message } from "../utils/typeorm";
import { CreateMessageParams } from "../utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class MessageService implements IMessageService {

  constructor(
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>
  ) {
  }

  async createMessage({ user, content, conversationId }: CreateMessageParams): Promise<Message> {

    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId
      },
      relations: ["creator", "recipient"]
    });

    if (!conversation)
      throw new HttpException("Conversation Not Found", HttpStatus.BAD_REQUEST);


    const { creator, recipient } = conversation;

    if (creator.id !== user.id || recipient.id !== user.id)
      throw new HttpException("Cannot Create Messsage", HttpStatus.FORBIDDEN);

    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: user,
      createdAt: Date.now()
    });

    return await this.messageRepository.save(newMessage);
  }

}