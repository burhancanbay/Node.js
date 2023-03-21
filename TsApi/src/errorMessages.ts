import { Request, Response, Next } from "express";

const ERROR_MESSAGES = {
  NOT_INTEGER_PARAMS: "please enter an integer parameter!",
  NOT_INTEGER_TYPE: "type id must be an integer!",
  NOT_INTEGER_ITEM: "item id must be an integer!",
  NOT_INTEGER_PARENT_ITEM: "parent item id must be an integer!",
  NOT_INTEGER_STATUS: "status id must be an integer!",
  NOT_INTEGER_CATEGORY: "category id must be an integer!",
  NOT_INTEGER_CONTRACT: "contract id must be an integer!",
  NOT_INTEGER_USER: "user id must be an integer!",
  NOT_INTEGER_TO_USER: "toUser id must be an integer!",
  NOT_INTEGER_FROM_USER: "fromUser id must be an integer!",
  NOT_EXISTS_FROM_USER: "fromUser not exists in the user list!",
  NOT_EXISTS_TO_USER: "toUser not exists in the user list!",
  NOT_EXISTS_USER: "this user not exists!",
  NOT_EXISTS_STATUS: "this status not exists!",
  NOT_EXISTS_ITEM: "this item not exists!",
  NOT_EXISTS_PARENT_ITEM: "this parent item not exists!",
  NOT_EXISTS_TRANSACTION_TYPE: "this transaction type not exists!",
  NOT_EXISTS_CONTRACT: "this contract not exists!",
  NOT_EXISTS_CATEGORY: "this category not exists!",
  NOT_EXISTS_RELEASE: "this release not exists!",
  NOT_EXISTS_ASSET: "this asset not exists!",
  NOT_EXISTS_TRANSACTION: "this transaction not exists!",
};

const sendErrorMessage = (message: string, response: Response) => {
  return response.status(400).send({ message });
};

export { sendErrorMessage, ERROR_MESSAGES };
