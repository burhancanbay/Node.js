import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Transaction } from "../entity/Transaction";
import { userRepository } from "./UserController";
import { itemRepository } from "./ItemController";
import { transactionTypeRepository } from "./TransactionTypeController";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const transactionRepository = AppDataSource.getRepository(Transaction);

const getTransactions = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const transactions = await transactionRepository.find({
    relations: {
      fromUser: true,
      toUser: true,
      item: true,
      type: true,
    },
  });
  return response.status(200).send(transactions);
};

const getTransactionDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const fromUserId = parseInt(request.params.fromUserId);
    const toUserId = parseInt(request.params.toUserId);

    if (!Number.isInteger(fromUserId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    if (!Number.isInteger(toUserId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const transaction = await transactionRepository.find({
      where: { fromUser: { id: fromUserId }, toUser: { id: toUserId } },
      relations: {
        item: true,
        type: true,
      },
    });
    if (!transaction) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }
    return response.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getTransactionById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const transaction = await transactionRepository.findOne({
      where: { id },
      relations: {
        fromUser: true,
        toUser: true,
        item: true,
        type: true,
      },
    });
    if (!transaction) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }
    return response.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getTransactionByFromUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const fromUserId = parseInt(request.params.fromUserId);

    if (!Number.isInteger(fromUserId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const from_user = await userRepository.findOne({
      where: { id: fromUserId },
    });

    if (!from_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_FROM_USER, response);
    }

    const transaction = await transactionRepository.find({
      where: { fromUser: { id: fromUserId } },
      relations: {
        toUser: true,
        item: true,
        type: true,
      },
    });
    if (!transaction) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }
    return response.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getTransactionByToUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const toUserId = parseInt(request.params.toUserId);

    if (!Number.isInteger(toUserId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const from_user = await userRepository.findOne({
      where: { id: toUserId },
    });

    if (!from_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_FROM_USER, response);
    }

    const transaction = await transactionRepository.find({
      where: { toUser: { id: toUserId } },
      relations: {
        fromUser: true,
        item: true,
        type: true,
      },
    });
    if (!transaction) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }
    return response.status(200).send(transaction);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createTransaction = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { quantity, fromUser, toUser, item, type } = request.body;

    if (!Number.isInteger(fromUser)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_FROM_USER, response);
    }

    const from_user = await userRepository.findOne({
      where: { id: fromUser },
    });

    if (!from_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_FROM_USER, response);
    }

    if (!Number.isInteger(toUser)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_TO_USER, response);
    }

    const to_user = await userRepository.findOne({
      where: { id: toUser },
    });
    if (!to_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TO_USER, response);
    }
    if (!Number.isInteger(item)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_ITEM, response);
    }
    const _item = await itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }
    if (!Number.isInteger(type)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_TYPE, response);
    }
    const transactionType = await transactionTypeRepository.findOne({
      where: { id: type },
    });

    if (!transactionType) {
      return sendErrorMessage(
        ERROR_MESSAGES.NOT_EXISTS_TRANSACTION_TYPE,
        response
      );
    }
    const transaction = Object.assign(new Transaction(), {
      quantity,
      fromUser,
      toUser,
      item,
      type,
    });
    await transactionRepository.save(transaction);

    return response.status(201).send(transaction);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateTransaction = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const { fromUser, toUser, item, type } = request.body;

    let transactionToUpdate = await transactionRepository.findOneBy({
      id,
    });
    if (!transactionToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }

    if (!Number.isInteger(fromUser)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_FROM_USER, response);
    }
    const from_user = await userRepository.findOne({
      where: { id: fromUser },
    });

    if (!from_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_FROM_USER, response);
    }

    if (!Number.isInteger(toUser)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_TO_USER, response);
    }
    const to_user = await userRepository.findOne({
      where: { id: toUser },
    });

    if (!to_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TO_USER, response);
    }

    if (!Number.isInteger(item)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_ITEM, response);
    }
    const _item = await itemRepository.findOne({
      where: { id: item },
    });

    if (!_item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }

    if (!Number.isInteger(type)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_TYPE, response);
    }
    const transactionType = await transactionTypeRepository.findOne({
      where: { id: type },
    });

    if (!transactionType) {
      return sendErrorMessage(
        ERROR_MESSAGES.NOT_EXISTS_TRANSACTION_TYPE,
        response
      );
    }

    transactionRepository.merge(transactionToUpdate, request.body);

    await transactionRepository.save(transactionToUpdate);

    return response.status(200).send(transactionToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeTransaction = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let transactionToRemove = await transactionRepository.findOne({
      where: { id },
      relations: {
        fromUser: true,
        toUser: true,
        item: true,
        type: true,
      },
    });

    if (!transactionToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_TRANSACTION, response);
    }
    await transactionRepository.remove(transactionToRemove);

    return response.status(200).send(transactionToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  transactionRepository,
  getTransactions,
  getTransactionDetails,
  getTransactionById,
  getTransactionByFromUser,
  getTransactionByToUser,
  createTransaction,
  updateTransaction,
  removeTransaction,
};
