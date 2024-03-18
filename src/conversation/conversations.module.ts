import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { Services } from "../utils/constants";

@Module({
  controllers: [ConversationsController],
  providers: [{
    provide: Services.COVNERSATIONS,
    useClass: ConversationsService
  }]
})
export class ConversationsModule {
}
