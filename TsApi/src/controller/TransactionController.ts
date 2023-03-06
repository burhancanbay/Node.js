import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";
import { User } from "../entity/User";
import { TransactionType } from "../entity/TransactionType";
import { Transaction } from "../entity/Transaction";
import { UserController } from "./UserController";
import { ItemController } from "./ItemController";
import { TransactionTypeController } from "./TransactionTypeController";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find({
      relations: {
        fromUser: true,
        toUser: true,
        item: true,
        type: true,
      },
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        fromUser: true,
        toUser: true,
        item: true,
        type: true,
      },
    });

    if (!transaction) {
      return "unregistered transaction";
    }
    return transaction;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let userController = new UserController();
    let itemController = new ItemController();
    let transactionTypeController = new TransactionTypeController();

    const { transactionDate, transactionQty, fromUser, toUser, item, type } =
      request.body;

    if (!Number.isInteger(fromUser)) {
      return `${fromUser} is not an integer`;
    }
    const from_user = await userController.userRepository.findOne({
      where: { id: fromUser },
    });
    if (!from_user) {
      return "unregistered user";
    }

    if (!Number.isInteger(toUser)) {
      return `${toUser} is not an integer`;
    }
    const to_user = await userController.userRepository.findOne({
      where: { id: toUser },
    });
    if (!to_user) {
      return "unregistered user";
    }

    if (!Number.isInteger(item)) {
      return `${item} is not an integer`;
    }
    const _item = await itemController.itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return "unregistered item";
    }

    if (!Number.isInteger(type)) {
      return `${type} is not an integer`;
    }
    const transactionType =
      await transactionTypeController.transactionTypeRepository.findOne({
        where: { id: type },
      });
    if (!transactionType) {
      return "unregistered transaction type";
    }

    const transaction = Object.assign(new Transaction(), {
      transactionDate,
      transactionQty,
      fromUser,
      toUser,
      item,
      type,
    });

    return this.transactionRepository.save(transaction);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let userController = new UserController();
    let itemController = new ItemController();
    let transactionTypeController = new TransactionTypeController();

    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }
    const { transactionDate, transactionQty, fromUser, toUser, item, type } =
      request.body;

    let transactionToUpdate = await this.transactionRepository.findOneBy({
      id,
    });
    if (!transactionToUpdate) {
      return "this transaction not exist";
    }

    if (!Number.isInteger(fromUser)) {
      return `${fromUser} is not an integer`;
    }
    const from_user = await userController.userRepository.findOne({
      where: { id: fromUser },
    });
    if (!from_user) {
      return "unregistered user";
    }

    if (!Number.isInteger(toUser)) {
      return `${toUser} is not an integer`;
    }
    const to_ser = await userController.userRepository.findOne({
      where: { id: toUser },
    });
    if (!to_ser) {
      return "unregistered user";
    }

    if (!Number.isInteger(item)) {
      return `${item} is not an integer`;
    }
    const _item = await itemController.itemRepository.findOne({
      where: { id: item },
    });
    if (!_item) {
      return "unregistered item";
    }

    if (!Number.isInteger(type)) {
      return `${type} is not an integer`;
    }
    const transactionType =
      await transactionTypeController.transactionTypeRepository.findOne({
        where: { id: type },
      });
    if (!transactionType) {
      return "unregistered transaction type";
    }

    this.transactionRepository.merge(transactionToUpdate, request.body);

    return await this.transactionRepository.save(transactionToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let transactionToRemove = await this.transactionRepository.findOneBy({
      id,
    });

    if (!transactionToRemove) {
      return "this transaction not exist";
    }

    return await this.transactionRepository.remove(transactionToRemove);
  }
}
