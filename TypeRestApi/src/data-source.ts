import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./models/course";
import { Lesson } from "./models/lesson";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [Course, Lesson],
  synchronize: true,
  logging: true,
});
