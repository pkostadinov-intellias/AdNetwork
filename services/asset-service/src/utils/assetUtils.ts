import axios from "axios";
import createHttpError from "http-errors";
import { AssetOwnerType, AssetType } from "../entities/Asset";
import { imageKit } from "../config/imageKit";

/**
 * Validates if the owner exists by sending a GET request to the service.
 * Throws appropriate errors if the owner is missing or service is down.
 */
export const validateOwner = async (serviceUrl: string, ownerId: string) => {
  try {
    await axios.get(`${serviceUrl}/${ownerId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("dadada");
      if (error.response) {
        if (error.response.status === 404) {
          throw new createHttpError.NotFound(
            `Owner with id: ${ownerId} not found.`
          );
        }
        throw createHttpError(
          error.response.status,
          `Service error: ${error.response.statusText}`
        );
      } else if (error.request) {
        throw new createHttpError.ServiceUnavailable(
          "The owner service is currently unavailable."
        );
      }
    }
    throw new createHttpError.InternalServerError("Unexpected error occurred.");
  }
};

/**
 * Updates or removes the asset reference for an owner.
 */
export const updateOwnerAssetReference = async (
  serviceUrl: string,
  ownerId: string,
  ownerType: AssetOwnerType,
  imageKitFileId: string,
  assetType: AssetType,
  url: string | null
) => {
  const assetTypeMap: Record<AssetType, string> = {
    [AssetType.AVATAR]: "avatarUrl",
    [AssetType.COVER]: "coverImageUrl",
    [AssetType.MEDIA]: "mediaUrl"
  };

  if (!(assetType in assetTypeMap)) {
    throw new createHttpError.BadRequest(`Invalid asset type: ${assetType}`);
  }

  const payload = { [assetTypeMap[assetType]]: url };

  try {
    await axios.patch(`${serviceUrl}/${ownerId}`, payload);
  } catch (error) {
    if (url) {
      await imageKit.deleteFile(imageKitFileId);
    }
    throw new createHttpError.InternalServerError(
      `Failed to update ${ownerType} with new asset.`
    );
  }
};
