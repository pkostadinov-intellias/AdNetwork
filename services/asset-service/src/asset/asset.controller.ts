import { Context } from "koa";
import {
  uploadAssetService,
  getAssetByIdService,
  getAllAssetsService,
  deleteAssetService
} from "./asset.service";
import createHttpError from "http-errors";

export const uploadAsset = async (ctx: Context) => {
  const { fileName, fileType, ownerId, ownerType, assetType } =
    ctx.request.body;

  const file = ctx.request.files?.file;

  if (!file) {
    throw new createHttpError.BadRequest("No file uploaded");
  }

  const uploadedFile = Array.isArray(file) ? file[0] : file;

  const asset = await uploadAssetService(
    uploadedFile,
    fileName,
    fileType,
    ownerId,
    ownerType,
    assetType
  );

  ctx.status = 201;
  ctx.body = asset;
};

export const getAllAssets = async (ctx: Context) => {
  const assets = await getAllAssetsService();
  ctx.status = 200;
  ctx.body = assets;
};

export const getAssetById = async (ctx: Context) => {
  const { id } = ctx.params;
  const asset = await getAssetByIdService(id);

  ctx.status = 200;
  ctx.body = asset;
};

export const deleteAsset = async (ctx: Context) => {
  const { id } = ctx.params;
  await deleteAssetService(id);

  ctx.status = 204;
};
