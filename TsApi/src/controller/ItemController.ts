import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";
import { Category } from "../entity/Category";
import { Contract } from "../entity/Contract";
import { Status } from "../entity/Status";

export class ItemController {
  private itemRepository = AppDataSource.getRepository(Item);
  private categoryRepository = AppDataSource.getRepository(Category);
  private contractRepository = AppDataSource.getRepository(Contract);
  private statusRepository = AppDataSource.getRepository(Status);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.itemRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        categoryId: true,
        contractId: true,
        statusId: true,
        parentId: true,
      },
    });

    if (!item) {
      return "unregistered item";
    }
    return item;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {
      itemCode,
      gameCode,
      itemName,
      parentId,
      categoryId,
      statusId,
      contractId,
    } = request.body;

    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });

    if (!status) {
      return "unregistered status";
    }
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return "unregistered category";
    }
    const contract = await this.contractRepository.findOne({
      where: { id: contractId },
    });

    if (!contract) {
      return "unregistered contract";
    }
    const parentItem = await this.itemRepository.findOne({
      where: { id: parentId },
    });

    if (!parentItem) {
      return "unregistered parent item";
    }
    const item = Object.assign(new Item(), {
      itemCode,
      gameCode,
      itemName,
      parentId,
      categoryId,
      statusId,
      contractId,
    });

    return this.itemRepository.save(item);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {
      itemCode,
      gameCode,
      itemName,
      parentId,
      categoryId,
      statusId,
      contractId,
    } = request.body;

    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });

    if (!status) {
      return "unregistered status";
    }
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return "unregistered category";
    }
    const contract = await this.contractRepository.findOne({
      where: { id: contractId },
    });

    if (!contract) {
      return "unregistered contract";
    }
    const parentItem = await this.itemRepository.findOne({
      where: { id: parentId },
    });

    if (!parentItem) {
      return "unregistered parent item";
    }

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
