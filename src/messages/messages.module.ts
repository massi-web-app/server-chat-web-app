import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { Services } from "../utils/constants";
import { MessageService } from "./message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conversation, Message } from "../utils/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Message,Conversation])],
  controllers: [MessageController],
  providers: [{
    provide: Services.MESSAGES,
    useClass: MessageService
  }]
})
export class MessagesModule {
}
