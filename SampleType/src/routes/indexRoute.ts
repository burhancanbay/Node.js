import categoryRoutes from "./categoryRoute";
import userRoutes from "./userRoute";
import teamRoutes from "./teamRoute";

export const routes = [...categoryRoutes, ...userRoutes, ...teamRoutes];
