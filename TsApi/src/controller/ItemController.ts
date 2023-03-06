import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";
import { CategoryController } from "./CategoryController";
import { ContractController } from "./ContractController";
import { StatusController } from "./StatusController";

export class ItemController {
  private _itemRepository = AppDataSource.getRepository(Item);

  public get itemRepository() {
    return this._itemRepository;
  }
  async all(request: Request, response: Response, next: NextFunction) {
    return this.itemRepository.find({
      relations: {
        category: true,
        contract: true,
        status: true,
        parent: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const item = await this.itemRepository.findOne({
      where: { id },
      relations: {
        category: true,
        contract: true,
        status: true,
        parent: true,
      },
    });

    if (!item) {
      return "unregistered item";
    }
    return item;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let statusController = new StatusController();
    let categoryController = new CategoryController();
    let contractController = new ContractController();

    const { itemCode, gameCode, itemName, parent, category, status, contract } =
      request.body;

    if (!Number.isInteger(status)) {
      return `${status} is not an integer`;
    }
    const _status = await statusController.statusRepository.findOne({
      where: { id: status },
    });
    if (!_status) {
      return "unregistered status";
    }

    if (!Number.isInteger(category)) {
      return `${category} is not an integer`;
    }

    const _category = await categoryController.categoryRepository.findOne({
      where: { id: category },
    });
    if (!_category) {
      return "unregistered category";
    }

    if (!Number.isInteger(contract)) {
      return `${contract} is not an integer`;
    }
    const _contract = await contractController.contractRepository.findOne({
      where: { id: contract },
    });
    if (!_contract) {
      return "unregistered contract";
    }

    if (!Number.isInteger(parent)) {
      return `${parent} is not an integer`;
    }
    const parentItem = await this.itemRepository.findOne({
      where: { id: parent },
    });
    if (!parentItem) {
      return "unregistered parent item";
    }
    const item = Object.assign(new Item(), {
      itemCode,
      gameCode,
      itemName,
      parent,
      category,
      status,
      contract,
    });

    return this.itemRepository.save(item);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let statusController = new StatusController();
    let categoryController = new CategoryController();
    let contractController = new ContractController();
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const { itemCode, gameCode, itemName, parent, category, status, contract } =
      request.body;

    if (!Number.isInteger(status)) {
      return `${status} is not an integer`;
    }
    const _status = await statusController.statusRepository.findOne({
      where: { id: status },
    });
    if (!_status) {
      return "unregistered status";
    }

    if (!Number.isInteger(category)) {
      return `${category} is not an integer`;
    }
    const _category = await categoryController.categoryRepository.findOne({
      where: { id: category },
    });
    if (!_category) {
      return "unregistered category";
    }

    if (!Number.isInteger(contract)) {
      return `${contract} is not an integer`;
    }
    const _contract = await contractController.contractRepository.findOne({
      where: { id: contract },
    });
    if (!_contract) {
      return "unregistered contract";
    }

    if (!Number.isInteger(parent)) {
      return `${parent} is not an integer`;
    }
    const parentItem = await this.itemRepository.findOne({
      where: { id: parent },
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
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let itemToRemove = await this.itemRepository.findOneBy({ id });

    if (!itemToRemove) {
      return "this item not exist";
    }

    return await this.itemRepository.remove(itemToRemove);
  }
}
