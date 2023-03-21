import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryDetails,
  removeCategory,
  updateCategory,
} from "../controller/CategoryController";
import { adminUser } from "../middleWares/adminUser";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryDetails);
categoryRouter.post("/", adminUser, createCategory);
categoryRouter.put("/:id", adminUser, updateCategory);
categoryRouter.delete("/:id", adminUser, removeCategory);

export { categoryRouter };
