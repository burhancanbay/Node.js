import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Team } from "../entity/Team";

export class UserController {
  private categoryRepository = AppDataSource.getRepository(Category);
  private teamRepository = AppDataSource.getRepository(Team);

  async save(request: Request, response: Response, next: NextFunction) {
    const categoryId = parseInt(request.body.categoryId);

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      return "unregistered category";
    }
    const teamId = request.body.teamId;
    const team = await this.teamRepository.findOneBy({ id: teamId });
    if (!team) {
      return "unregistered team";
    }
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
      categoryId,
      teamId,
    });

    return this.userRepository.save(user);
  }

  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        categoryId: true,
        teamId: true,
      },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
