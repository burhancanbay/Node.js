import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";

import { userRouter } from "./route/userRouter";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
      res.send("hello world");
    });

    app.use("/users", userRouter);

    const port = 3000;

    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
