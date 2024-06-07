import varifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getAllPosts, currrentPostDetails, deletePost } from "../controllers/post.controller.js";
import { Router } from "express";

const postRouter = Router();

postRouter.use(varifyJWT); // We are using varifyJWT middleware to all these because we need cookie to access all these secured routes

postRouter
  .route("/create-post")
  .post(upload.fields([{ name: "post_img", maxcount: 1 }]), createPost);

postRouter.route("/get-all-posts").get(getAllPosts);

postRouter.route("/:post_id/current-post-details").post(currrentPostDetails);

postRouter.route("/:post_id/delete-post").delete(deletePost);

export default postRouter;
