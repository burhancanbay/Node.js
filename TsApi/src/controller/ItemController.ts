import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";
import { categoryRepository } from "./CategoryController";
import { contractRepository } from "./ContractController";
import { statusRepository } from "./StatusController";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const itemRepository = AppDataSource.getRepository(Item);

const getItems = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const items = await itemRepository.find({
    relations: {
      category: true,
      contract: true,
      status: true,
      parent: true,
    },
  });
  return response.status(200).send(items);
};

const getItemDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const item = await itemRepository.findOne({
      where: { id },
      relations: {
        category: true,
        contract: true,
        status: true,
        parent: true,
      },
    });

    if (!item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }
    return response.status(200).send(item);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { itemCode, gameCode, name, parent, category, status, contract } =
      request.body;

    if (!Number.isInteger(status)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_STATUS, response);
    }
    const _status = await statusRepository.findOne({
      where: { id: status },
    });
    if (!_status) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_STATUS, response);
    }

    if (!Number.isInteger(category)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_CATEGORY, response);
    }

    const _category = await categoryRepository.findOne({
      where: { id: category },
    });
    if (!_category) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }

    if (!Number.isInteger(contract)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_CONTRACT, response);
    }
    const _contract = await contractRepository.findOne({
      where: { id: contract },
    });
    if (!_contract) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CONTRACT, response);
    }

    if (!Number.isInteger(parent)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARENT_ITEM, response);
    }
    const parentItem = await itemRepository.findOne({
      where: { id: parent },
    });
    if (!parentItem) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_PARENT_ITEM, response);
    }
    const item = Object.assign(new Item(), {
      itemCode,
      gameCode,
      name,
      parent,
      category,
      status,
      contract,
    });
    await itemRepository.save(item);
    return response.status(200).send(item);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const { itemCode, gameCode, name, parent, category, status, contract } =
      request.body;

    if (!Number.isInteger(status)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_STATUS, response);
    }
    const _status = await statusRepository.findOne({
      where: { id: status },
    });
    if (!_status) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_STATUS, response);
    }

    if (!Number.isInteger(category)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_CATEGORY, response);
    }
    const _category = await categoryRepository.findOne({
      where: { id: category },
    });
    if (!_category) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }

    if (!Number.isInteger(contract)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_CONTRACT, response);
    }
    const _contract = await contractRepository.findOne({
      where: { id: contract },
    });
    if (!_contract) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }

    if (!Number.isInteger(parent)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARENT_ITEM, response);
    }
    const parentItem = await itemRepository.findOne({
      where: { id: parent },
    });
    if (!parentItem) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_PARENT_ITEM, response);
    }

    let itemToUpdate = await itemRepository.findOneBy({ id });

    if (!itemToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }

    itemRepository.merge(itemToUpdate, request.body);

    await itemRepository.save(itemToUpdate);

    return response.status(200).send(itemToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let itemToRemove = await itemRepository.findOne({
      where: { id },
      relations: {
        category: true,
        contract: true,
        status: true,
        parent: true,
      },
    });

    if (!itemToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }

    await itemRepository.remove(itemToRemove);

    return response.status(200).send(itemToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  itemRepository,
  getItems,
  getItemDetails,
  createItem,
  updateItem,
  removeItem,
};
