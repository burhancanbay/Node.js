import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const userTokenByName = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const username = request.params.name;
  const authorization = request.header("Authorization");
  if (!authorization) {
    return response.status(401).send("Access denied. No token provided.");
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.error(err);
      response.status(401).send("Invalid token");
      return;
    }
    request.id = decoded.id;
    request.name = decoded.name;
    request.address = decoded.address;

    // console.log(request.id);
    // console.log(request.name);
    // console.log(request.address);

    if (request.name == username || request.name == "system") {
      next();
    } else {
      return response
        .status(403)
        .send({ message: "Access denied.You are not authorized" });
    }
  });
};
