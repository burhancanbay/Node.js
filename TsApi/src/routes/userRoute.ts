import {
  getUsers,
  getUserById,
  // createUser,
  removeUser,
  updateUser,
  getUserByName,
  register,
  login,
  restoreUser,
} from "../controller/UserController";
import { Router } from "express";
import { adminUser } from "../middleWares/adminUser";
import { userTokenById } from "../middleWares/userTokenById";
import { userTokenByName } from "../middleWares/userTokenByName";

const userRouter = Router();

userRouter.get("/", adminUser, getUsers);
userRouter.get("/:userId", userTokenById, getUserById);
userRouter.get("/name/:name", userTokenByName, getUserByName);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/:userId", userTokenById, updateUser);
userRouter.put("/restore/:userId", userTokenById, restoreUser);
userRouter.delete("/:userId", userTokenById, removeUser);

export { userRouter };
