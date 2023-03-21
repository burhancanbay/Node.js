import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { routes } from "./routes/indexRoute";
import { userRouter } from "./routes/userRoute";
import { categoryRouter } from "./routes/categoryRoute";
import { assetRouter } from "./routes/assetRoute";
import { contractRouter } from "./routes/contractRoute";
import { itemRouter } from "./routes/itemRoute";
import { releaseRouter } from "./routes/releaseRoute";
import { statusRouter } from "./routes/statusRoute";
import { transactionRouter } from "./routes/transactionRoute";
import { transactionTypeRouter } from "./routes/transactionTypeRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
      res.send("hello world");
    });

    // app.use("/users", routes);
    // app.use("/categories", routes);

    // app.use("/assets", routes);
    // app.use("/categories", routes);
    // app.use("/contracts", routes);
    // app.use("/items", routes);
    // app.use("/releases", routes);
    // app.use("/statuses", routes);
    // app.use("/transactions", routes);
    // app.use("/transactiontypes", routes);
    // app.use("/users", routes);

    app.use("/assets", assetRouter);
    app.use("/categories", categoryRouter);
    app.use("/contracts", contractRouter);
    app.use("/items", itemRouter);
    app.use("/releases", releaseRouter);
    app.use("/statuses", statusRouter);
    app.use("/transactions", transactionRouter);
    app.use("/transactiontypes", transactionTypeRouter);
    app.use("/users", userRouter);

    const port = process.env.LISTEN_PORT || 3001;
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
