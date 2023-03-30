import { Router } from "express";
import userController from "../controller/UserController";

export const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserDetails);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/:id", userController.updateUser);
userRouter.put("/password/:id", userController.updateUserPassword);
userRouter.put("/restore/:id", userController.restoreUser);
userRouter.delete("/:id", userController.removeUser);
