import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Asset } from "../entity/Asset";

export class AssetController {
  private assetRepository = AppDataSource.getRepository(Asset);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.assetRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const asset = await this.assetRepository.findOne({
      where: { id },
    });

    if (!asset) {
      return "unregistered asset";
    }
    return asset;
  }
}
