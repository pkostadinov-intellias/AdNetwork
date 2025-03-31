import Router from "koa-router";
import {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  createComment
} from "./post.controller";

import { validatorMiddleware } from "../../middleware/validator.middleware";
import {
  createCommentSchema,
  createPostSchema,
  updatePostSchema
} from "./post-validation.shema";

export const postRouter = new Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getPostById);
postRouter.get("/posts/user/:userId", getPostsByUserId);

postRouter.post("/posts", validatorMiddleware(createPostSchema), createPost);
postRouter.patch(
  "/posts/:id",
  validatorMiddleware(updatePostSchema),
  updatePost
);

postRouter.post(
  "/posts/:id/comments",
  validatorMiddleware(createCommentSchema),
  createComment
);
postRouter.post("/posts/:id/likes", toggleLike);

postRouter.delete("/posts/:id", deletePost);
