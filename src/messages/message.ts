import {Message} from "../utils/typeorm";
import {CreateMessageParams} from "../utils/types";


export interface IMessageService {
    createMessage(createMessageParams: CreateMessageParams): Promise<Message>;

    getMessagesByConversationId(conversationId: number): Promise<Message[]>;
}