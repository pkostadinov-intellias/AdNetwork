import createHttpError from "http-errors";
import {
  commentRepository,
  likeRepository,
  postRepository
} from "../../config/database";
import { Post } from "../../entities/Post";
import type { File as FormidableFile } from "formidable";
import axios from "axios";
import fs from "fs";
import { config } from "../../config/config";
import FormData from "form-data";
import { validateUserExists } from "../../../utils/helper";

export const getAllPostsService = async () => {
  const posts = await postRepository.find({
    relations: ["likes", "comments"],
    order: { createdAt: "DESC" }
  });

  return posts;
};

export const getPostByIdService = async (id: string) => {
  const post = await postRepository.findOne({
    where: { id },
    relations: ["likes", "comments"]
  });

  if (!post) {
    throw new createHttpError.NotFound("Post not found");
  }

  return post;
};

export const getPostsByUserIdService = async (userId: string) => {
  const posts = await postRepository.find({
    where: { userId },
    relations: ["likes", "comments"],
    order: { createdAt: "DESC" }
  });

  return posts;
};

export const createPostService = async (
  file: FormidableFile,
  data: Partial<Post>,
  headers: Record<string, string>,
  userId: string
) => {
  await validateUserExists(userId, headers);

  const newPost = postRepository.create({
    ...data,
    userId
  });

  const savedPost = await postRepository.save(newPost);

  const formData = new FormData();
  formData.append("file", fs.createReadStream(file.filepath));
  formData.append("fileName", file.originalFilename || "upload");
  formData.append("fileType", file.mimetype || "application/octet-stream");
  formData.append("ownerId", savedPost.id);
  formData.append("ownerType", "post");
  formData.append("assetType", "media");

  try {
    const assetRes = await axios.post(config.ASSET_SERVICE_ENDPOINT, formData, {
      headers
    });

    const mediaUrl = assetRes.data.url;
    savedPost.mediaUrl = mediaUrl;
    return await postRepository.save(savedPost);
  } catch (error) {
    await postRepository.delete(savedPost.id);
    console.error("Asset upload failed. Post rolled back.");
    throw new createHttpError.BadRequest("Asset upload failed");
  }
};

//TODO NEED TO REFACTOR updatePostService TO HANDLE IMAGES
export const updatePostService = async (id: string, data: Partial<Post>) => {
  const post = await postRepository.findOneBy({ id });

  if (!post) {
    throw new createHttpError.NotFound("Post not found");
  }

  Object.assign(post, data);
  return await postRepository.save(post);
};

export const deletePostService = async (
  postId: string,
  headers: Record<string, string>
) => {
  const post = await postRepository.findOneBy({ id: postId });

  if (!post) {
    throw new createHttpError.NotFound("Post not found");
  }

  if (post.mediaUrl) {
    try {
      const assetRes = await axios.get(
        `${config.ASSET_SERVICE_ENDPOINT}/by-owner/${postId}`,
        { headers }
      );

      const asset = assetRes.data;

      if (asset?.id) {
        await axios.delete(`${config.ASSET_SERVICE_ENDPOINT}/${asset.id}`, {
          headers
        });
      }
    } catch (error) {
      console.error("Failed to delete asset related to post:", error);
      throw new createHttpError.InternalServerError(
        "Failed to delete post media asset."
      );
    }
  }

  await postRepository.remove(post);
};

export const createCommentService = async (
  postId: string,
  userId: string,
  content: string
) => {
  const post = await postRepository.findOneBy({ id: postId });
  if (!post) throw new createHttpError.NotFound("Post not found");

  const newComment = commentRepository.create({ userId, content, post });
  return await commentRepository.save(newComment);
};

export const toggleLikeService = async (postId: string, userId: string) => {
  const post = await postRepository.findOneBy({ id: postId });
  if (!post) throw new createHttpError.NotFound("Post not found");

  const existingLike = await likeRepository.findOne({
    where: { userId, post: { id: postId } },
    relations: ["post"]
  });

  if (existingLike) {
    await likeRepository.delete(existingLike.id);
    return false; // unliked
  }

  const newLike = likeRepository.create({ userId, post });
  await likeRepository.save(newLike);
  return true; // liked
};
