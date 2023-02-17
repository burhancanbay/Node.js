import assetRoutes from "./assetRoute";
import categoryRoutes from "./categoryRoute";
import contractRoutes from "./contractRoute";
import itemRoutes from "./itemRoute";
import statusRoutes from "./statusRoute";
import userRoutes from "./userRoute";

export const routes = [
  ...assetRoutes,
  ...categoryRoutes,
  ...contractRoutes,
  ...itemRoutes,
  ...statusRoutes,
  ...userRoutes,
];
