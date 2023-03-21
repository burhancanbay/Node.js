import { Router } from "express";

import {
  createTransaction,
  getTransactionByFromUser,
  getTransactionById,
  getTransactionByToUser,
  getTransactionDetails,
  getTransactions,
  removeTransaction,
  updateTransaction,
} from "../controller/TransactionController";
import { adminUser } from "../middleWares/adminUser";
import { fromUserToUserToken } from "../middleWares/fromUserToUserToken";
import { fromUserToken } from "../middleWares/fromUserToken";
import { toUserToken } from "../middleWares/toUserToken";

const transactionRouter = Router();

transactionRouter.get("/", adminUser, getTransactions);
transactionRouter.get(
  "/fromUser/:fromUserId/toUser/:toUserId",
  fromUserToUserToken,
  getTransactionDetails
);
transactionRouter.get(
  "/fromUser/:fromUserId",
  fromUserToken,
  getTransactionByFromUser
);
transactionRouter.get("/toUser/:toUserId", toUserToken, getTransactionByToUser);
transactionRouter.get("/:id", adminUser, getTransactionById);
transactionRouter.post("/", adminUser, createTransaction);
transactionRouter.put("/:id", adminUser, updateTransaction);
transactionRouter.delete("/:id", adminUser, removeTransaction);

export { transactionRouter };
