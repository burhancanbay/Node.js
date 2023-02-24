import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

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

    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      return "this user not exist";
    }

    this.userRepository.merge(updatedUser, request.body);
    let message = "user has been updated";
    await this.userRepository.save(updatedUser);
    return response.status(200).json({ message, updatedUser });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let removedUser = await this.userRepository.findOneBy({ id });

    if (!removedUser) {
      return "this user not exist";
    }
    let message = "user has been removed";
    await this.userRepository.remove(removedUser);
    return response.status(200).json({ message, removedUser });
  }
}
