import { TransactionTypeController } from "../controller/TransactionTypeController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/transactiontypes",
    controller: TransactionTypeController,
    action: "all",
  },
  {
    method: "get",
    route: "/transactiontypes/:id",
    controller: TransactionTypeController,
    action: "one",
  },
  {
    method: "post",
    route: "/transactiontypes",
    controller: TransactionTypeController,
    action: "save",
  },
  {
    method: "put",
    route: "/transactiontypes/:id",
    controller: TransactionTypeController,
    action: "update",
  },
  {
    method: "delete",
    route: "/transactiontypes/:id",
    controller: TransactionTypeController,
    action: "remove",
  },
];

export default routes;
