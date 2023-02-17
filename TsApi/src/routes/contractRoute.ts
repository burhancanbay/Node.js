import { ContractController } from "../controller/ContractController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/contract",
    controller: ContractController,
    action: "all",
  },
  {
    method: "get",
    route: "/contract/:id",
    controller: ContractController,
    action: "one",
  },
  {
    method: "post",
    route: "/contract",
    controller: ContractController,
    action: "save",
  },
  {
    method: "put",
    route: "/contract/:id",
    controller: ContractController,
    action: "update",
  },
  {
    method: "delete",
    route: "/contract/:id",
    controller: ContractController,
    action: "remove",
  },
];

export default routes;
