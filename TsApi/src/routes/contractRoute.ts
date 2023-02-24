import { ContractController } from "../controller/ContractController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/contracts",
    controller: ContractController,
    action: "all",
  },
  {
    method: "get",
    route: "/contracts/:id",
    controller: ContractController,
    action: "one",
  },
  {
    method: "post",
    route: "/contracts",
    controller: ContractController,
    action: "save",
  },
  {
    method: "put",
    route: "/contracts/:id",
    controller: ContractController,
    action: "update",
  },
  {
    method: "delete",
    route: "/contracts/:id",
    controller: ContractController,
    action: "remove",
  },
];

export default routes;
