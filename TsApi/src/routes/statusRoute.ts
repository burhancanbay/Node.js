import { StatusController } from "../controller/StatusController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/statuses",
    controller: StatusController,
    action: "all",
  },
  {
    method: "get",
    route: "/statuses/:id",
    controller: StatusController,
    action: "one",
  },
  {
    method: "post",
    route: "/statuses",
    controller: StatusController,
    action: "save",
  },
  {
    method: "put",
    route: "/statuses/:id",
    controller: StatusController,
    action: "update",
  },
  {
    method: "delete",
    route: "/statuses/:id",
    controller: StatusController,
    action: "remove",
  },
];

export default routes;
