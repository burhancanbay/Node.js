import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { ReleaseBeforeInsert1678359765485 } from "./migration/1678359765485-ReleaseBeforeInsert";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "08teknoloji",
  database: "trigerSample",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
