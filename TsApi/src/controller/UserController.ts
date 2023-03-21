import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { ERROR_MESSAGES, sendErrorMessage } from "../errorMessages";
import { IsNotEmpty, isNotEmpty, validate } from "class-validator";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = await userRepository.find();

  return response.status(200).send(user);
};

const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
    }
    return response.status(200).send(user);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const getUserByName = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const username = request.params.name;

    const user = await userRepository.findOne({
      where: { name: username },
    });
    // const user = await AppDataSource.query("SELECT convert_user_name($1)", [
    //   username,
    // ]);

    return response.status(200).send(user);

    if (!user) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
    }
    return response.status(200).send(user);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, address } = request.body;
    let user = new User();
    user.name = name;
    user.address = user.setAddress(address);

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
    const { name, address } = request.body;

    if (!(name && address)) {
      return response.status(400).send("not null");
    }
    let user: User;
    user = await userRepository.findOneBy({ name: name });

    if (!user) {
      return response.status(400).send("please sign up before login");
    }
    if (user && !user.isValidAddress(address)) {
      return response.status(401).send("incorrect address");
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
//   try {
//     const { name, address } = request.body;

//     // const user = await AppDataSource.query("CALL insert_user($1, $2)", [
//     //   name,
//     //   address,
//     // ]);

//     // return response.status(201).send({ message: "new record created" });

//     const user = Object.assign(new User(), {
//       name,
//       address,
//     });

//     await userRepository.save(user);

//     return response.status(201).json(user);
//   } catch (error) {
//     return response.status(400).send(error.detail);
//     // return response.status(400).send({ message: "values must be unique" });
//   }
// };

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    let userToUpdate = await userRepository.findOneBy({ id: userId });

    if (!userToUpdate) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
    }
    userRepository.merge(userToUpdate, request.body);

    const { name, address } = request.body;
    userToUpdate.name = name;
    userToUpdate.address = userToUpdate.setAddress(address);
    await userRepository.save(userToUpdate);

    return response.status(200).send(userToUpdate);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const removeUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }
    let userToRemove = await userRepository.findOneBy({ id: userId });

    if (!userToRemove) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_EXISTS_USER, response);
    }
    await userRepository.softRemove({ id: userId });

    return response.status(200).send(userToRemove);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

const restoreUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(request.params.userId);

    if (!Number.isInteger(userId)) {
      return sendErrorMessage(ERROR_MESSAGES.NOT_INTEGER_PARAMS, response);
    }

    let userToRestore = await userRepository.restore({ id: userId });

    return response.status(200).send(userToRestore);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error.detail);
  }
};

export {
  getUsers,
  getUserById,
  getUserByName,
  register,
  login,
  // createUser,
  updateUser,
  removeUser,
  restoreUser,
  userRepository,
};
