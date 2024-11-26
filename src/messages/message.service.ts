import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {IMessageService} from "./message";
import {Conversation, Message, User} from "../utils/typeorm";
import {CreateMessageParams} from "../utils/types";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {instanceToPlain} from "class-transformer";


@Injectable()
export class MessageService implements IMessageService {

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversation) private readonly conversationRepository: Repository<Conversation>
    ) {
    }

    async createMessage({user, content, conversationId}: CreateMessageParams): Promise<Message> {

        const conversation = await this.conversationRepository.findOne({
            where: {
                id: conversationId
            },
            relations: ["creator", "recipient"],
        });


        if (!conversation)
            throw new HttpException("Conversation Not Found", HttpStatus.BAD_REQUEST);


        const {creator, recipient} = conversation;


        console.log(creator.id,user.id,recipient.id);

        if (creator.id !== user.id && recipient.id !== user.id)
            throw new HttpException("Cannot Create Message", HttpStatus.FORBIDDEN);


        conversation.creator = instanceToPlain(conversation.creator) as User;
        conversation.recipient = instanceToPlain(conversation.recipient) as User;

        const newMessage = this.messageRepository.create({
            content,
            conversation,
            author: instanceToPlain(user),
        });

        return await this.messageRepository.save(newMessage);
    }

}