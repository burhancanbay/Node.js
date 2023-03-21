import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

import { TransactionType } from "../entity/TransactionType";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const transactionTypeRepository = AppDataSource.getRepository(TransactionType);

const getTransactionTypes = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const transactionTypes = await transactionTypeRepository.find();
  return response.status(200).send(transactionTypes);
};

const getTransactionTypeDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const transactionType = await transactionTypeRepository.findOne({
      where: { id },
    });

    if (!transactionType) {
      return sendErrorMessage(
        ERROR_MESSAGES.NOT_EXISTS_TRANSACTION_TYPE,
        response
      );
    }
    return response.status(200).send(transactionType);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createTransactionType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name } = request.body;

    const transactionType = Object.assign(new TransactionType(), {
      name,
    });
    await transactionTypeRepository.save(transactionType);

    return response.status(201).send(transactionType);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateTransactionType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let transactionTypeToUpdate = await transactionTypeRepository.findOneBy({
      id,
    });

    if (!transactionTypeToUpdate) {
      return sendErrorMessage(
        ERROR_MESSAGES.NOT_EXISTS_TRANSACTION_TYPE,
        response
      );
    }

    transactionTypeRepository.merge(transactionTypeToUpdate, request.body);

    await transactionTypeRepository.save(transactionTypeToUpdate);

    return response.status(200).send(transactionTypeToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeTransactionType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let transactionTypeToRemove = await transactionTypeRepository.findOneBy({
      id,
    });

    if (!transactionTypeToRemove) {
      return sendErrorMessage(
        ERROR_MESSAGES.NOT_EXISTS_TRANSACTION_TYPE,
        response
      );
    }
    await transactionTypeRepository.remove(transactionTypeToRemove);

    return response.status(200).send(transactionTypeToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  transactionTypeRepository,
  getTransactionTypes,
  getTransactionTypeDetails,
  createTransactionType,
  updateTransactionType,
  removeTransactionType,
};
