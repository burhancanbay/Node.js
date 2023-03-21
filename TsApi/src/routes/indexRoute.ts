import { assetRouter } from "./assetRoute";
import { categoryRouter } from "./categoryRoute";
import { contractRouter } from "./contractRoute";
import { itemRouter } from "./itemRoute";
import { releaseRouter } from "./releaseRoute";
import { statusRouter } from "./statusRoute";
import { transactionRouter } from "./transactionRoute";
import { transactionTypeRouter } from "./transactionTypeRoute";
import { userRouter } from "./userRoute";

export const routes = [
  ...assetRouter,
  ...categoryRouter,
  ...contractRouter,
  ...itemRouter,
  ...releaseRouter,
  ...statusRouter,
  ...transactionRouter,
  ...transactionTypeRouter,
  ...userRouter,
];
