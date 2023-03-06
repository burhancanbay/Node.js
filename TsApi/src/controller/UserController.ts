import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { QueryFailedError, Unique } from "typeorm";

export class UserController {
  private _userRepository = AppDataSource.getRepository(User);

  public get userRepository() {
    return this._userRepository;
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  // async oneName(request: Request, response: Response, next: NextFunction) {
  //   const name = request.params.name;

  //   const user = await this.userRepository.findOneBy({
  //     userName: name,
  //   });

  //   if (!user) {
  //     return "unregistered user";
  //   }
  //   return user;
  // }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { userName, userAddress } = request.body;

    const user = Object.assign(new User(), {
      userName,
      userAddress,
    });

    return this.userRepository.save(user);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      return "this user not exist";
    }

    this.userRepository.merge(updatedUser, request.body);

    return await this.userRepository.save(updatedUser);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    if (!Number.isInteger(id)) {
      return "please enter an integer parameter";
    }

    let removedUser = await this.userRepository.findOneBy({ id });

    if (!removedUser) {
      return "this user not exist";
    }

    return await this.userRepository.remove(removedUser);
  }
}
