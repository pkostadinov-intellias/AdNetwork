import Router from "koa-router";
import {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  createComment,
  deleteComment
} from "./post.controller";

import { validatorMiddleware } from "../../middleware/validator.middleware";
import {
  createCommentSchema,
  createPostSchema,
  updatePostSchema
} from "./post-validation.shema";
import { authorizeUserOrAdmin } from "../../middleware/authorize-user-admin.middleware";
import { authorizeOwnerOrAdmin } from "../../middleware/authorize-owner-admin.middleware";

export const postRouter = new Router();

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getPostById);
postRouter.get("/posts/user/:userId", getPostsByUserId);

postRouter.post("/posts", validatorMiddleware(createPostSchema), createPost);
postRouter.patch(
  "/posts/:id",
  validatorMiddleware(updatePostSchema),
  authorizeOwnerOrAdmin,
  updatePost
);

postRouter.delete("/posts/:id", authorizeOwnerOrAdmin, deletePost);

postRouter.post(
  "/posts/:id/comments",
  validatorMiddleware(createCommentSchema),
  createComment
);

postRouter.delete(
  "/posts/:id/comments/:commentId",
  authorizeUserOrAdmin,
  deleteComment
);

postRouter.post("/posts/:id/likes", toggleLike);
