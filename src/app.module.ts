import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PassportModule } from "@nestjs/passport";
import { ConversationsModule } from './conversation/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { GatewayModule } from './gateway/gateway.module';
import {EventEmitterModule} from '@nestjs/event-emitter'
import entities from "./utils/typeorm";


@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConversationsModule,
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
    MessagesModule,
    GatewayModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
