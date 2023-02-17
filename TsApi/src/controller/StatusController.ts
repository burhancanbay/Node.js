import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Status } from "../entity/Status";

export class StatusController {
  private statusRepository = AppDataSource.getRepository(Status);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.statusRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const status = await this.statusRepository.findOne({
      where: { id },
    });

    if (!status) {
      return "unregistered status";
    }
    return status;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { status_name } = request.body;

    const user = Object.assign(new Status(), {
      status_name,
    });

    return this.statusRepository.save(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let statusToUpdate = await this.statusRepository.findOneBy({ id });

    if (!statusToUpdate) {
      return "this status not exist";
    }

    this.statusRepository.merge(statusToUpdate, request.body);

    return await this.statusRepository.save(statusToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let statusToRemove = await this.statusRepository.findOneBy({ id });

    if (!statusToRemove) {
      return "this status not exist";
    }

    return await this.statusRepository.remove(statusToRemove);
  }
}
