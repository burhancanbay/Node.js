import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";

const categoryRepository = AppDataSource.getRepository(Category);

const getCategories = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categories = await categoryRepository.find();
  return response.status(200).send(categories);
};

const getCategoryDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const category = await categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }
    return response.status(200).send(category);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const createCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name } = request.body;

    const category = Object.assign(new Category(), {
      name,
    });
    await categoryRepository.save(category);

    return response.status(201).send(category);
  } catch (error) {
    return response.status(400).send(error.detail);
  }
};

const updateCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    let categoryToUpdate = await categoryRepository.findOneBy({ id });

    if (!categoryToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }
    categoryRepository.merge(categoryToUpdate, request.body);

    await categoryRepository.save(categoryToUpdate);

    return response.status(200).send(categoryToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    let categoryToRemove = await categoryRepository.findOneBy({ id });

    if (!categoryToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_CATEGORY, response);
    }

    await categoryRepository.remove(categoryToRemove);

    return response.status(200).send(categoryToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  categoryRepository,
  getCategories,
  getCategoryDetails,
  createCategory,
  updateCategory,
  removeCategory,
};
