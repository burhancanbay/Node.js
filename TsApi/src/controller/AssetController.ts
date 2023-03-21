import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Asset } from "../entity/Asset";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";
import { userRepository } from "./UserController";
import { itemRepository } from "./ItemController";

const assetRepository = AppDataSource.getRepository(Asset);

const getAssets = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const assets = await assetRepository.find({
    relations: {
      user: true,
      item: true,
    },
  });
  return response.status(200).send(assets);
};

const getAssetsById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const asset = await assetRepository.findOne({
      relations: {
        item: true,
      },
      where: { id },
    });

    if (!asset) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ASSET, response);
    }

    return response.status(200).json(asset);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getAssetsByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const _user = await userRepository.findOne({ where: { id: userId } });
    if (!_user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
    }
    const assets = await assetRepository.find({
      relations: {
        item: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (assets.length == 0) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ASSET, response);
    }

    return response.status(200).json(assets);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getAssetsByItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const itemId = parseInt(request.params.itemId);

    if (!Number.isInteger(itemId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    const item = await itemRepository.findOne({ where: { id: itemId } });
    if (!item) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
    }
    const asset = await assetRepository.find({
      relations: {
        user: true,
      },
      where: {
        item: {
          id: itemId,
        },
      },
    });

    if (asset.length == 0) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ASSET, response);
    }
    return response.status(200).json({ asset });
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getAssetDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = parseInt(request.params.userId);
  const itemId = parseInt(request.params.itemId);
  if (!Number.isInteger(userId)) {
    return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_USER, response);
  }
  if (!Number.isInteger(itemId)) {
    return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_ITEM, response);
  }
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
  }
  const item = await itemRepository.findOne({ where: { id: itemId } });
  if (!item) {
    return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ITEM, response);
  }
  const asset = await assetRepository.findOne({
    relations: {
      user: true,
      item: true,
    },
    where: {
      user: {
        id: userId,
      },
      item: {
        id: itemId,
      },
    },
  });

  if (!asset) {
    return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_ASSET, response);
  }

  return response.status(200).send(asset);
};

export {
  assetRepository,
  getAssets,
  getAssetDetails,
  getAssetsById,
  getAssetsByUser,
  getAssetsByItem,
};
