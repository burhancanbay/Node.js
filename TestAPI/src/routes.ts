import UserController from "./controller/UserController";
import { Router } from "express";

export const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserDetails);
router.post("/users", UserController.cerateUser);
router.delete("/users/:id", UserController.removeUser);
