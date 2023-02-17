import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";

export class ItemController {
  private itemRepository = AppDataSource.getRepository(Item);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.itemRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const item = await this.itemRepository.findOne({
      where: { id },
    });

    if (!item) {
      return "unregistered item";
    }
    return item;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {
      item_code,
      game_code,
      item_name,
      parent_id,
      category_id,
      status_id,
      contract_id,
    } = request.body;

    const item = Object.assign(new Item(), {
      item_code,
      game_code,
      item_name,
      parent_id,
      category_id,
      status_id,
      contract_id,
    });

    return this.itemRepository.save(item);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let itemToUpdate = await this.itemRepository.findOneBy({ id });

    if (!itemToUpdate) {
      return "this item not exist";
    }

    this.itemRepository.merge(itemToUpdate, request.body);

    return await this.itemRepository.save(itemToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let itemToRemove = await this.itemRepository.findOneBy({ id });

    if (!itemToRemove) {
      return "this item not exist";
    }

    return await this.itemRepository.remove(itemToRemove);
  }
}
