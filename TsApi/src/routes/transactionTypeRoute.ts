import { Router } from "express";
import {
  createTransactionType,
  getTransactionTypeDetails,
  getTransactionTypes,
  removeTransactionType,
  updateTransactionType,
} from "../controller/TransactionTypeController";
import { adminUser } from "../middleWares/adminUser";

const transactionTypeRouter = Router();

transactionTypeRouter.get("/", getTransactionTypes);
transactionTypeRouter.get("/:id", getTransactionTypeDetails);
transactionTypeRouter.post("/", adminUser, createTransactionType);
transactionTypeRouter.put("/:id", adminUser, updateTransactionType);
transactionTypeRouter.delete("/:id", adminUser, removeTransactionType);

export { transactionTypeRouter };
