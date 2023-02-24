import { ReleaseController } from "../controller/ReleaseController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/releases",
    controller: ReleaseController,
    action: "all",
  },
  {
    method: "get",
    route: "/releases/:id",
    controller: ReleaseController,
    action: "one",
  },
  {
    method: "post",
    route: "/releases",
    controller: ReleaseController,
    action: "save",
  },
  {
    method: "put",
    route: "/releases/:id",
    controller: ReleaseController,
    action: "update",
  },
  {
    method: "delete",
    route: "/releases/:id",
    controller: ReleaseController,
    action: "remove",
  },
];

export default routes;
