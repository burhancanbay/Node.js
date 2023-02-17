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
    route: "/assets/:id",
    controller: AssetController,
    action: "one",
  },
];

export default routes;
