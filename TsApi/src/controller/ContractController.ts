import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contract } from "../entity/Contract";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const contractRepository = AppDataSource.getRepository(Contract);

const getContracts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const contracts = await contractRepository.find();

  return response.status(200).send(contracts);
};

const getContractDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const contract = await contractRepository.findOne({ where: { id } });
    if (!contract) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CONTRACT, response);
    }
    return response.status(200).send(contract);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createContract = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { address } = request.body;

    const contract = Object.assign(new Contract(), {
      address,
    });
    await contractRepository.save(contract);

    return response.status(201).send(contract);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateContract = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let contractToUpdate = await contractRepository.findOneBy({ id });

    if (!contractToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CONTRACT, response);
    }

    contractRepository.merge(contractToUpdate, request.body);

    await contractRepository.save(contractToUpdate);

    return response.status(200).send(contractToUpdate);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const removeContract = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    let contractToRemove = await contractRepository.findOneBy({ id });

    if (!contractToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CONTRACT, response);
    }

    await contractRepository.remove(contractToRemove);

    return response.status(200).send(contractToRemove);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

export {
  contractRepository,
  getContracts,
  getContractDetails,
  createContract,
  updateContract,
  removeContract,
};
