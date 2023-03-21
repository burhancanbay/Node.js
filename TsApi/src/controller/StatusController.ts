import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Status } from "../entity/Status";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const statusRepository = AppDataSource.getRepository(Status);

const getStatuses = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statuses = await statusRepository.find();
  return response.status(200).send(statuses);
};

const getStatusDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const status = await statusRepository.findOne({
      where: { id },
    });

    if (!status) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_STATUS, response);
    }
    return response.status(200).send(status);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name } = request.body;

    const status = Object.assign(new Status(), {
      name,
    });
    await statusRepository.save(status);

    return response.status(201).send(status);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let statusToUpdate = await statusRepository.findOneBy({ id });

    if (!statusToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_STATUS, response);
    }

    statusRepository.merge(statusToUpdate, request.body);

    await statusRepository.save(statusToUpdate);

    return response.status(200).send(statusToUpdate);
  } catch (error) {
    console.log(error);
    response.status(400).send(error.detail);
  }
};

const removeStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let statusToRemove = await statusRepository.findOneBy({ id });

    if (!statusToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_STATUS, response);
    }
    await statusRepository.remove(statusToRemove);

    return response.status(200).send(statusToRemove);
  } catch (error) {
    console.log(error);
    response.status(400).send(error.detail);
  }
};

export {
  statusRepository,
  getStatuses,
  getStatusDetails,
  createStatus,
  updateStatus,
  removeStatus,
};
