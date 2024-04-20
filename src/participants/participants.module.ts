import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import { Services } from "../utils/constants";
import { Participant } from "../utils/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports:[TypeOrmModule.forFeature([Participant])],
  providers: [
    {
    provide: Services.PARTICIPANTS,
    useClass: ParticipantsService
    }
  ],
  exports:[
    {
    provide: Services.PARTICIPANTS,
    useClass: ParticipantsService
   }
  ]
})
export class ParticipantsModule {
}
