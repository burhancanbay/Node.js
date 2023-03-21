import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = await userRepository.find();

  return response.status(200).send(user);
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
  return response.status(200).send(user);
};

const createUser = async (
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

  await userRepository.save(user);

  return response.status(201).send(user);
};

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToUpdate = await userRepository.findOneBy({ id });

  if (!userToUpdate) {
    return "this user not exist";
  }

  userRepository.merge(userToUpdate, request.body);
  await userRepository.save(userToUpdate);

  return response.status(200).send(userToUpdate);
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

  return response.status(200).send(userToRemove);
};

export { getUsers, getUserDetails, createUser, updateUser, removeUser };
