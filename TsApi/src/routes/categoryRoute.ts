import { CategoryController } from "../controller/CategoryController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all",
  },
  {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "one",
  },
  {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "save",
  },
  {
    method: "put",
    route: "/categories/:id",
    controller: CategoryController,
    action: "update",
  },
  {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "remove",
  },
];

export default routes;
