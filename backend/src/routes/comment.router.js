import { addComment, updateComment, deleteComment, getAllComments } from "../controllers/comment.controller.js";
import deleteAllLikesOnComment from "../middlewares/deleteAllLikesOnComment.middleware.js";
import { Router } from "express";
import varifyJWT from "../middlewares/auth.middleware.js";

const commentRouter = Router();

commentRouter.use(varifyJWT);

commentRouter.route("/:post_id/add-comment").put(addComment);

commentRouter.route("/:post_id/get-all-comments").get(getAllComments);

commentRouter.route("/:post_id/:comment_id/update-comment").patch(updateComment);

commentRouter.route("/:post_id/:comment_id/delete-comment").delete(deleteAllLikesOnComment, deleteComment);

export default commentRouter;
