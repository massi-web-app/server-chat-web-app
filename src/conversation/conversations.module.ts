import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { Services } from "../utils/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conversation } from "../utils/typeorm";
import { UsersModule } from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([Conversation]),UsersModule],
  controllers: [ConversationsController],
  providers: [{
    provide: Services.CONVERSATIONS,
    useClass: ConversationsService
  }]
})
export class ConversationsModule {
}
