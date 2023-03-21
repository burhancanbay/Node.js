import {
  createItem,
  getItemDetails,
  getItems,
  removeItem,
  updateItem,
} from "../controller/ItemController";
import { Router } from "express";
import { adminUser } from "../middleWares/adminUser";

const itemRouter = Router();

itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemDetails);
itemRouter.post("/", adminUser, createItem);
itemRouter.put("/:id", adminUser, updateItem);
itemRouter.delete("/:id", adminUser, removeItem);

export { itemRouter };
