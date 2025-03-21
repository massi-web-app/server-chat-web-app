import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {Routes, Services} from "../utils/constants";
import {IMessageService} from "./message";
import {CreateMessageDto} from "./dto/CreateMessage.dto";
import {AuthUser} from "../utils/decorators";
import {User} from "../utils/typeorm";
import {EventEmitter2} from "@nestjs/event-emitter";

@Controller(Routes.MESSAGES)
export class MessageController {


    constructor(
        @Inject(Services.MESSAGES) private readonly messageService: IMessageService,
        private eventEmitter: EventEmitter2
    ) {
    }


    @Post("")
    async createMessage(@AuthUser() user: User, @Body() createMessageDto: CreateMessageDto) {
        const msg=await this.messageService.createMessage({...createMessageDto, user});
        this.eventEmitter.emit("message.create",msg);
        return msg;
    }


    @Get(':conversationId')
    getMessagesFromConversations(
        @AuthUser() user: User,
        @Param('conversationId') conversationId: number) {
        return this.messageService.getMessagesByConversationId(conversationId);
    }
}
