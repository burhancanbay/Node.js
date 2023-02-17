export type MethodType = "get" | "post" | "put" | "delete";
// const actions = ["all", "one", "save", "remove", "update"] as const;
// export type ActionType = typeof actions[number];
export type ActionType = "all" | "one" | "save" | "update" | "remove";

export type RouteType = {
  method: MethodType;
  route: string;
  controller: any;
  action: ActionType;
};
