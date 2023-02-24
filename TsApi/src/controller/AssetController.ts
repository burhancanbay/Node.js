import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Asset } from "../entity/Asset";

export class AssetController {
  private assetRepository = AppDataSource.getRepository(Asset);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.assetRepository.find({
      relations: {
        userId: true,
        itemId: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userId = parseInt(request.params.userId);
    const itemId = parseInt(request.params.itemId);

    const asset = await this.assetRepository.findOne({
      relations: {
        userId: true,
        itemId: true,
      },
      where: {
        userId: {
          id: userId,
        },
        itemId: {
          id: itemId,
        },
      },
    });

    if (!asset) {
      return "unregistered asset";
    }
    return asset;
  }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   const userId = parseInt(request.params.userId);
  //   const itemId = parseInt(request.params.itemId);

  //   const asset = await this.assetRepository

  //     .createQueryBuilder("asset")
  //     .leftJoinAndSelect("asset.userId", "user")
  //     .leftJoinAndSelect("asset.itemId", "item")
  //     .where("asset.userId = :userId", { userId: userId })
  //     .andWhere("asset.itemId = :itemId", { itemId: itemId })
  //     .getOne();

  //   if (!asset) {
  //     return "unregistered asset";
  //   }
  //   return asset;
  // }
}
