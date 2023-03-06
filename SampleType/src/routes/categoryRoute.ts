import { CategoryController } from "../controller/CategoryController";

import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/category",
    controller: CategoryController,
    action: "all",
  },
  {
    method: "get",
    route: "/category/:id",
    controller: CategoryController,
    action: "one",
  },

  {
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "save",
  },
  {
    method: "put",
    route: "/category/:id",
    controller: CategoryController,
    action: "update",
  },
  {
    method: "delete",
    route: "/category/:id",
    controller: CategoryController,
    action: "remove",
  },
];
export default routes;
