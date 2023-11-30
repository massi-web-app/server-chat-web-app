import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { Passport } from "passport";
import { PassportModule } from "@nestjs/passport";
import { AppDataSource } from "./utils/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env.development" }),
    TypeOrmModule.forRoot(AppDataSource.options),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,

    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
