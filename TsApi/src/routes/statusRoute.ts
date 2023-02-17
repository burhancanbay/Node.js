import { StatusController } from "../controller/StatusController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/status",
    controller: StatusController,
    action: "all",
  },
  {
    method: "get",
    route: "/status/:id",
    controller: StatusController,
    action: "one",
  },
  {
    method: "post",
    route: "/status",
    controller: StatusController,
    action: "save",
  },
  {
    method: "put",
    route: "/status/:id",
    controller: StatusController,
    action: "update",
  },
  {
    method: "delete",
    route: "/status/:id",
    controller: StatusController,
    action: "remove",
  },
];

export default routes;
