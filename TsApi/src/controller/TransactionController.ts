import { AppDataSource } from "../data-source";

import { NextFunction, Request, Response } from "express";
import { Item } from "../entity/Item";
import { User } from "../entity/User";
import { TransactionType } from "../entity/TransactionType";
import { Transaction } from "../entity/Transaction";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private itemRepository = AppDataSource.getRepository(Item);
  private userRepository = AppDataSource.getRepository(User);
  private transactionTypeRepository =
    AppDataSource.getRepository(TransactionType);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        fromUserId: true,
        toUserId: true,
        itemId: true,
        typeId: true,
      },
    });

    if (!transaction) {
      return "unregistered transaction";
    }
    return transaction;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {
      transactionDate,
      transactionQty,
      fromUserId,
      toUserId,
      itemId,
      typeId,
    } = request.body;

    const fromUser = await this.userRepository.findOne({
      where: { id: fromUserId },
    });

    if (!fromUser) {
      return "unregistered user";
    }
    const toUser = await this.userRepository.findOne({
      where: { id: toUserId },
    });

    if (!toUserId) {
      return "unregistered user";
    }
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      return "unregistered item";
    }
    const transactionType = await this.transactionTypeRepository.findOne({
      where: { id: typeId },
    });

    if (!transactionType) {
      return "unregistered transaction type";
    }

    const transaction = Object.assign(new Transaction(), {
      transactionDate,
      transactionQty,
      fromUserId,
      toUserId,
      itemId,
      typeId,
    });

    return this.transactionRepository.save(transaction);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {
      transactionDate,
      transactionQty,
      fromUserId,
      toUserId,
      itemId,
      typeId,
    } = request.body;

    let transactionToUpdate = await this.transactionRepository.findOneBy({
      id,
    });

    if (!transactionToUpdate) {
      return "this transaction not exist";
    }
    const fromUser = await this.userRepository.findOne({
      where: { id: fromUserId },
    });

    if (!fromUser) {
      return "unregistered user";
    }
    const toUser = await this.userRepository.findOne({
      where: { id: toUserId },
    });

    if (!toUserId) {
      return "unregistered user";
    }
    const item = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      return "unregistered item";
    }
    const transactionType = await this.transactionTypeRepository.findOne({
      where: { id: typeId },
    });

    if (!transactionType) {
      return "unregistered transaction type";
    }

    this.transactionRepository.merge(transactionToUpdate, request.body);

    return await this.transactionRepository.save(transactionToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let transactionToRemove = await this.transactionRepository.findOneBy({
      id,
    });

    if (!transactionToRemove) {
      return "this transaction not exist";
    }

    return await this.transactionRepository.remove(transactionToRemove);
  }
}
