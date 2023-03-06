import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return await userRepository.find();
};

const getUserDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user) {
    return "unregistered user";
  }
  return user;
};

const cerateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { firstName, lastName, age } = request.body;

  const user = Object.assign(new User(), {
    firstName,
    lastName,
    age,
  });

  return await userRepository.save(user);
};

const removeUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToRemove = await userRepository.findOneBy({ id });

  if (!userToRemove) {
    return "this user not exist";
  }

  await userRepository.remove(userToRemove);

  return "user has been removed";
};

export default { getUsers, getUserDetails, cerateUser, removeUser };
