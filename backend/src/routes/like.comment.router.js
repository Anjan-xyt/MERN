import { likeComment, dislikeComment, likesOnComment, dislikesOnComment} from "../controllers/like.comment.controller.js";
import { Router } from "express";
import varifyJWT from "../middlewares/auth.middleware.js";

const likeCommentRouter = Router();

likeCommentRouter.use(varifyJWT);

likeCommentRouter.route("/:comment_id/like").post(likeComment);

likeCommentRouter.route("/:comment_id/dislike").post(dislikeComment);

likeCommentRouter.route("/:comment_id/get-all-likes").get(likesOnComment);

likeCommentRouter.route("/:comment_id/get-all-dislikes").get(dislikesOnComment);


export default likeCommentRouter;