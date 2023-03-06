import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Release } from "../entity/Release";
import { Item } from "../entity/Item";
import { ItemController } from "./ItemController";

export class ReleaseController {
  private releaseRepository = AppDataSource.getRepository(Release);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.releaseRepository.find({ relations: { item: true } });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const release = await this.releaseRepository.findOne({
      where: { id },
      relations: { item: true },
    });

    if (!release) {
      return "unregistered release";
    }
    return release;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let itemController = new ItemController();
    const { releaseQty, releaseDate, item } = request.body;

    const _item = await itemController.itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return "unregistered item";
    }
    const release = Object.assign(new Release(), {
      releaseQty,
      releaseDate,
      item,
    });

    return this.releaseRepository.save(release);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let itemController = new ItemController();
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }
    const { releaseQty, releaseDate, item } = request.body;

    let releaseToUpdate = await this.releaseRepository.findOneBy({ id });

    if (!releaseToUpdate) {
      return "this release not exist";
    }
    const _item = await itemController.itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return "unregistered item";
    }

    this.releaseRepository.merge(releaseToUpdate, request.body);

    return await this.releaseRepository.save(releaseToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let releaseToRemove = await this.releaseRepository.findOneBy({ id });

    if (!releaseToRemove) {
      return "this release not exist";
    }

    return await this.releaseRepository.remove(releaseToRemove);
  }
}
