import { ItemController } from "../controller/ItemController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/items",
    controller: ItemController,
    action: "all",
  },
  {
    method: "get",
    route: "/items/:id",
    controller: ItemController,
    action: "one",
  },
  {
    method: "post",
    route: "/items",
    controller: ItemController,
    action: "save",
  },
  {
    method: "put",
    route: "/items/:id",
    controller: ItemController,
    action: "update",
  },
  {
    method: "delete",
    route: "/items/:id",
    controller: ItemController,
    action: "remove",
  },
];

export default routes;
