import { likePost, dislikePost, likesOnPost, dislikesOnPost } from "../controllers/like.post.controller.js";
import { Router } from "express";
import varifyJWT from "../middlewares/auth.middleware.js";

const likePostRouter = Router();

likePostRouter.use(varifyJWT);

likePostRouter.route("/:post_id/like").post(likePost);

likePostRouter.route("/:post_id/dislike").post(dislikePost);

likePostRouter.route("/:post_id/get-all-likes").get(likesOnPost);

likePostRouter.route("/:post_id/get-all-dislikes").get(dislikesOnPost);


export default likePostRouter;