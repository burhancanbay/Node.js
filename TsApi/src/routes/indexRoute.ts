import assetRoutes from "./assetRoute";
import categoryRoutes from "./categoryRoute";
import contractRoutes from "./contractRoute";
import itemRoutes from "./itemRoute";
import statusRoutes from "./statusRoute";
import userRoutes from "./userRoute";
import releaseRoutes from "./releaseRoute";
import transactionTypeRoutes from "./transactionTypeRoute";
import transactionRoutes from "./transactionRoute";

export const routes = [
  ...assetRoutes,
  ...categoryRoutes,
  ...contractRoutes,
  ...itemRoutes,
  ...statusRoutes,
  ...userRoutes,
  ...releaseRoutes,
  ...transactionTypeRoutes,
  ...transactionRoutes,
];
