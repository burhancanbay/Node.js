import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Item } from "./entity/Item";
import { Asset } from "./entity/Asset";
import { Transaction } from "./entity/Transaction";
import { Category } from "./entity/Category";
import { Status } from "./entity/Status";
import { Contract } from "./entity/Contract";
import { TransactionType } from "./entity/TransactionType";
import { Release } from "./entity/Release";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Item,
    Asset,
    Transaction,
    Category,
    Status,
    Contract,
    TransactionType,
    Release,
  ],
  migrations: [],
  subscribers: [],
});
