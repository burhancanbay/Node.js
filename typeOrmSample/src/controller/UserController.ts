import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const users = await userRepository.find();
  return response.send(users);
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
    return response.send("unregistered user");
  }
  return response.send(user);
};

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, age, email, password } = request.body;
    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.email = email;
    user.password = user.setPassword(password);

    const errors = await validate(user);
    if (errors.length > 0) {
      return response.status(400).send(errors);
    }

    await userRepository.save(user);
    return response.status(201).send(user);
  } catch (error) {
    return response.status(409).send(error.detail);
  }
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;

    if (!(email && password)) {
      return response.status(400).send("not null");
    }
    let user: User;
    user = await userRepository.findOneBy({ email: email });

    if (!user) {
      return response.status(400).send("please sign up before login");
    }
    if (user && !user.isValidPassword(password)) {
      return response.status(401).send("incorrect password");
    }
    const access_token = user.generateJWT();

    return response.status(200).json({ accessToken: access_token });
  } catch (error) {
    response.status(401).send(error);
  }
};

// const createUser = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { firstName, lastName, age, email, password } = request.body;

//   const user = Object.assign(new User(), {
//     firstName,
//     lastName,
//     age,
//     email,
//     password,
//   });
//   await userRepository.save(user);
//   return response.send(user);
// };

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const { firstName, lastName, age, email, password } = request.body;

  let userToUpdate = await userRepository.findOneBy({ id });

  if (!userToUpdate) {
    return response.send("unregistered user");
  }

  userRepository.merge(userToUpdate, request.body);
  userToUpdate.firstName = firstName;
  userToUpdate.lastName = lastName;
  userToUpdate.age = age;

  await userRepository.save(userToUpdate);

  return response.send(userToUpdate);
};

const updateUserPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const { firstName, lastName, age, email, password } = request.body;

  let userToUpdate = await userRepository.findOneBy({ id });

  if (!userToUpdate) {
    return response.send("unregistered user");
  }

  userRepository.merge(userToUpdate, request.body);

  userToUpdate.password = userToUpdate.setPassword(password);

  await userRepository.save(userToUpdate);

  return response.send(userToUpdate);
};

const removeUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToRemove = await userRepository.findOneBy({ id });

  if (!userToRemove) {
    return response.send("unregistered user");
  }

  await userRepository.softRemove(userToRemove);

  return response.send(userToRemove);
};

const restoreUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);

  let userToRestore = await userRepository.restore({ id });

  return response.send(userToRestore);
};

export default {
  userRepository,
  getUsers,
  getUserDetails,
  register,
  login,
  updateUser,
  updateUserPassword,
  removeUser,
  restoreUser,
};
