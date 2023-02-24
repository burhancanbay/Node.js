import { AssetController } from "../controller/AssetController";
import { RouteType } from "./types";

const routes: RouteType[] = [
  {
    method: "get",
    route: "/assets",
    controller: AssetController,
    action: "all",
  },
  {
    method: "get",
    route: "/assets/user/:userId/item/:itemId",
    controller: AssetController,
    action: "one",
  },
  {
    method: "get",
    route: "/assets/item/:itemId",
    controller: AssetController,
    action: "one",
  },
  {
    method: "get",
    route: "/assets/user/:userId",
    controller: AssetController,
    action: "one",
  },
  {
    method: "get",
    route: "/assets/:id",
    controller: AssetController,
    action: "one",
  },
];

export default routes;
