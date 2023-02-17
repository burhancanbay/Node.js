import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Release } from "../entity/Release";

export class ReleaseController {
  private releaseRepository = AppDataSource.getRepository(Release);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.releaseRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const release = await this.releaseRepository.findOne({
      where: { id },
    });

    if (!release) {
      return "unregistered user";
    }
    return release;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { releaseQty, releaseDate, itemId } = request.body;

    const release = Object.assign(new Release(), {
      releaseQty,
      releaseDate,
      itemId,
    });

    return this.releaseRepository.save(release);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let releaseToUpdate = await this.releaseRepository.findOneBy({ id });

    if (!releaseToUpdate) {
      return "this release not exist";
    }

    this.releaseRepository.merge(releaseToUpdate, request.body);

    return await this.releaseRepository.save(releaseToUpdate);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let releaseToRemove = await this.releaseRepository.findOneBy({ id });

    if (!releaseToRemove) {
      return "this release not exist";
    }

    return await this.releaseRepository.remove(releaseToRemove);
  }
}