import { Context } from "koa";
import {
  getAllPostsService,
  getPostByIdService,
  getPostsByUserIdService,
  createPostService,
  updatePostService,
  deletePostService,
  toggleLikeService,
  createCommentService,
  deleteCommentService
} from "./post.service";
import { getXUserHeader } from "../../../utils/helper";
import createHttpError from "http-errors";

export const getAllPosts = async (ctx: Context) => {
  const posts = await getAllPostsService();
  ctx.body = posts;
};

export const getPostById = async (ctx: Context) => {
  const post = await getPostByIdService(ctx.params.id);
  ctx.body = post;
};

export const getPostsByUserId = async (ctx: Context) => {
  const posts = await getPostsByUserIdService(ctx.params.userId);
  ctx.body = posts;
};

export const createPost = async (ctx: Context) => {
  const userId = ctx.state.user.id;

  const file = ctx.request.files?.file;

  if (!file) {
    throw new createHttpError.BadRequest("No file uploaded");
  }

  const uploadedFile = Array.isArray(file) ? file[0] : file;

  const { content, visibility } = ctx.request.body;

  const post = await createPostService(
    uploadedFile,
    { content, visibility },
    getXUserHeader(ctx),
    userId
  );

  ctx.status = 201;
  ctx.body = post;
};

export const updatePost = async (ctx: Context) => {
  const updated = await updatePostService(ctx.params.id, ctx.request.body);
  ctx.body = updated;
};

export const deletePost = async (ctx: Context) => {
  await deletePostService(ctx.params.id, getXUserHeader(ctx));
  ctx.status = 204;
};

export const createComment = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const username = ctx.state.user.username;
  const postId = ctx.params.id;
  const { content } = ctx.request.body;

  const comment = await createCommentService(postId, userId, username, content);

  ctx.status = 201;
  ctx.body = comment;
};

export const deleteComment = async (ctx: Context) => {
  const commentId = ctx.params.commentId;

  await deleteCommentService(commentId);

  ctx.status = 204;
};

export const toggleLike = async (ctx: Context) => {
  const userId = ctx.state.user.id;
  const postId = ctx.params.id;

  const liked = await toggleLikeService(postId, userId);

  ctx.body = { liked };
};
