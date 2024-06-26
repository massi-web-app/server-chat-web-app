import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { ConversationsModule } from './conversation/conversations.module';
import { ParticipantsModule } from './participants/participants.module';
import entities from "./utils/typeorm";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env.development" }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_DB_HOST,
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      port:parseInt(process.env.MYSQL_DB_PORT),
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
    }),
    AuthModule,
    UsersModule,
    ConversationsModule,
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
