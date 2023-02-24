import { TransactionController } from "../controller/TransactionController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all",
  },
  {
    method: "get",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "one",
  },
  {
    method: "post",
    route: "/transactions",
    controller: TransactionController,
    action: "save",
  },
  {
    method: "put",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "update",
  },
  {
    method: "delete",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "remove",
  },
];

export default routes;
