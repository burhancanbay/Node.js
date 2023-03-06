import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

import { TransactionType } from "../entity/TransactionType";

export class TransactionTypeController {
  private _transactionTypeRepository =
    AppDataSource.getRepository(TransactionType);

  public get transactionTypeRepository() {
    return this._transactionTypeRepository;
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionTypeRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const transactionType = await this.transactionTypeRepository.findOne({
      where: { id },
    });

    if (!transactionType) {
      return "unregistered transaction type";
    }
    return transactionType;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { transactionName } = request.body;

    const transactionType = Object.assign(new TransactionType(), {
      transactionName,
    });

    return this.transactionTypeRepository.save(transactionType);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let transactionTypeToUpdate =
      await this.transactionTypeRepository.findOneBy({ id });

    if (!transactionTypeToUpdate) {
      return "this transaction type not exist";
    }

    this.transactionTypeRepository.merge(transactionTypeToUpdate, request.body);

    return await this.transactionTypeRepository.save(transactionTypeToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let transactionTypeToRemove =
      await this.transactionTypeRepository.findOneBy({ id });

    if (!transactionTypeToRemove) {
      return "this transaction type not exist";
    }

    return await this.transactionTypeRepository.remove(transactionTypeToRemove);
  }
}
