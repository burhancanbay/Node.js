import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contract } from "../entity/Contract";

export class ContractController {
  private contractRepository = AppDataSource.getRepository(Contract);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.contractRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const contract = await this.contractRepository.findOne({
      where: { id },
    });

    if (!contract) {
      return "unregistered contract";
    }
    return contract;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { contract_address } = request.body;

    const contract = Object.assign(new Contract(), {
      contract_address,
    });

    return this.contractRepository.save(contract);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let contractToUpdate = await this.contractRepository.findOneBy({ id });

    if (!contractToUpdate) {
      return "this contract not exist";
    }

    this.contractRepository.merge(contractToUpdate, request.body);

    return await this.contractRepository.save(contractToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let contractToRemove = await this.contractRepository.findOneBy({ id });

    if (!contractToRemove) {
      return "this contract not exist";
    }

    return await this.contractRepository.remove(contractToRemove);
  }
}
