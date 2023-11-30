import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Session } from "./entities/Session";
const entities = [User];

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_DB_HOST,
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  port: parseInt(process.env.MYSQL_DB_PORT),
  database: process.env.MYSQL_DB_NAME,
  synchronize: true,
  entities: [User],
});

export { User, Session };
