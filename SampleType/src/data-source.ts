import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Team } from "./entity/Team";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "08teknoloji",
  database: "sampleAPI",
  synchronize: true,
  logging: false,
  entities: [User, Category, Team],
  migrations: [],
  subscribers: [],
});
