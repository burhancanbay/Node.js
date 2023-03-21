import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Release } from "../entity/Release";
import { Item } from "../entity/Item";
import { itemRepository } from "./ItemController";
import { send } from "process";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const releaseRepository = AppDataSource.getRepository(Release);

const getReleases = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const releases = await releaseRepository.find({ relations: { item: true } });

  return response.status(200).send(releases);
};

const getReleaseDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const release = await releaseRepository.findOne({
      where: { id },
      relations: { item: true },
    });

    if (!release) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_RELEASE, response);
    }
    return response.status(200).send(release);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createRelease = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { quantity, item } = request.body;

    if (!Number.isInteger(item)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_ITEM, response);
    }

    const _item = await itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }
    const release = Object.assign(new Release(), {
      quantity,
      item,
    });
    await releaseRepository.save(release);

    return response.status(201).send(release);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateRelease = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const { item } = request.body;

    if (!Number.isInteger(item)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_ITEM, response);
    }

    let releaseToUpdate = await releaseRepository.findOneBy({ id });

    if (!releaseToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_RELEASE, response);
    }
    const _item = await itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }

    releaseRepository.merge(releaseToUpdate, request.body);

    await releaseRepository.save(releaseToUpdate);

    return response.status(200).send(releaseToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeRelease = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let releaseToRemove = await releaseRepository.findOne({
      where: { id },
      relations: { item: true },
    });

    if (!releaseToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_RELEASE, response);
    }
    await releaseRepository.remove(releaseToRemove);

    return response.status(200).send(releaseToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  releaseRepository,
  getReleases,
  getReleaseDetails,
  createRelease,
  updateRelease,
  removeRelease,
};
