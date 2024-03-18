import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TypeormStore } from "connect-typeorm/out";
import { Session } from "./utils/typeorm";
import * as session from "express-session";
import * as passport from "passport";
import { getRepository } from "typeorm";


async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);
  app.enableCors({ origin: ["http://localhost:3000"], credentials: true });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      name: "CHAT_APP_SESSION_ID",
      cookie: {
        maxAge: 86400000, //cookie expire 1 day later
      },
      store: new TypeormStore().connect(sessionRepository)
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());


  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
