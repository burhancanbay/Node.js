import { Router } from "express";
import {
  createStatus,
  getStatusDetails,
  getStatuses,
  removeStatus,
  updateStatus,
} from "../controller/StatusController";
import { adminUser } from "../middleWares/adminUser";

const statusRouter = Router();

statusRouter.get("/", getStatuses);
statusRouter.get("/:id", getStatusDetails);
statusRouter.post("/", adminUser, createStatus);
statusRouter.put("/:id", adminUser, updateStatus);
statusRouter.delete("/:id", adminUser, removeStatus);

export { statusRouter };
