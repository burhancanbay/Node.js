import { verify } from "crypto";
import {
  getAssetDetails,
  getAssets,
  getAssetsByUser,
  getAssetsByItem,
  getAssetsById,
} from "../controller/AssetController";
import { Router } from "express";
import { userTokenById } from "../middleWares/userTokenById";
import { adminUser } from "../middleWares/adminUser";

const assetRouter = Router();

assetRouter.get("/", adminUser, getAssets);
assetRouter.get("/:id", adminUser, getAssetsById);
assetRouter.get("/user/:userId/", userTokenById, getAssetsByUser);
assetRouter.get("/item/:itemId/", adminUser, getAssetsByItem);
assetRouter.get("/user/:userId/item/:itemId", userTokenById, getAssetDetails);

export { assetRouter };
