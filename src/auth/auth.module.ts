import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Services } from "src/utils/constants";
import { UsersModule } from "src/users/users.module";
import { LocalSterategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    LocalSterategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
