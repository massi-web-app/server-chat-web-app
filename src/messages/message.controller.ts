import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import {Routes, Services} from "../utils/constants";
import {IMessageService} from "./message";
import {CreateMessageDto} from "./dto/CreateMessage.dto";
import {AuthUser} from "../utils/decorators";
import {User} from "../utils/typeorm";

@Controller(Routes.MESSAGES)
export class MessageController {


    constructor(@Inject(Services.MESSAGES) private readonly messageService: IMessageService) {
    }


    @Post("")
    createMessage(@AuthUser() user: User, @Body() createMessageDto: CreateMessageDto) {
        return this.messageService.createMessage({...createMessageDto, user});
    }


    @Get(':conversationId')
    getMessagesFromConversations(
        @AuthUser() user: User,
        @Param('conversationId') conversationId: number) {
        console.log(conversationId);
        return this.messageService.getMessagesByConversationId(conversationId);

    }
}
