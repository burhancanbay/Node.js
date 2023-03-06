import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Asset } from "../entity/Asset";

export class AssetController {
  private assetRepository = AppDataSource.getRepository(Asset);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.assetRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  async all1(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return `userId should be an integer`;
    }

    const asset = await this.assetRepository.find({
      relations: {
        user: true,
        item: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!asset) {
      return "unregistered asset";
    }

    return asset;
  }

  async all2(request: Request, response: Response, next: NextFunction) {
    const itemId = parseInt(request.params.itemId);

    if (!Number.isInteger(itemId)) {
      return `itemId should be an integer`;
    }
    const asset = await this.assetRepository.find({
      relations: {
        user: true,
        item: true,
      },
      where: {
        item: {
          id: itemId,
        },
      },
    });

    if (!asset) {
      return "unregistered asset";
    }

    return asset;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.userId);
    const itemId = parseInt(request.params.itemId);
    if (!Number.isInteger(userId)) {
      return `userId should be an integer`;
    }
    if (!Number.isInteger(itemId)) {
      return `itemId should be an integer`;
    }
    const asset = await this.assetRepository.findOne({
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
      return "unregistered asset";
    }

    return asset;
  }
}
