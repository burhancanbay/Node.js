import { TeamController } from "../controller/TeamController";

import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/teams",
    controller: TeamController,
    action: "all",
  },
  {
    method: "get",
    route: "/teams/:id",
    controller: TeamController,
    action: "one",
  },
  {
    method: "put",
    route: "/teams/:id",
    controller: TeamController,
    action: "update",
  },
  {
    method: "post",
    route: "/teams",
    controller: TeamController,
    action: "save",
  },

  {
    method: "delete",
    route: "/teams/:id",
    controller: TeamController,
    action: "remove",
  },
];
export default routes;
