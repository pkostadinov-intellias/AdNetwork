import Router from "koa-router";

import {
  uploadAsset,
  getAssetById,
  getAllAssets,
  deleteAsset
} from "./asset.controller";
import { validatorMiddleware } from "../middleware/validator.middleware";
import { uploadAssetSchema } from "./asset-validation.schema";

export const assetRouter = new Router({ prefix: "/assets" });

assetRouter.post("/", validatorMiddleware(uploadAssetSchema), uploadAsset);

assetRouter.get("/", getAllAssets);

assetRouter.get("/:id", getAssetById);

assetRouter.delete("/:id", deleteAsset);
