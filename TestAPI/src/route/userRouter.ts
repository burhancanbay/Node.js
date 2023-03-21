import {
  getUsers,
  getUserDetails,
  createUser,
  removeUser,
  updateUser,
} from "../controller/UserController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserDetails);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", removeUser);

export { userRouter };
