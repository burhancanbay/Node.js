import { Router } from "express";
import {
  createRelease,
  getReleaseDetails,
  getReleases,
  removeRelease,
  updateRelease,
} from "../controller/ReleaseController";
import { adminUser } from "../middleWares/adminUser";

const releaseRouter = Router();

releaseRouter.get("/", getReleases);
releaseRouter.get("/:id", getReleaseDetails);
releaseRouter.post("/", adminUser, createRelease);
releaseRouter.put("/:id", adminUser, updateRelease);
releaseRouter.delete("/:id", adminUser, removeRelease);

export { releaseRouter };
