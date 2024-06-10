import { Router } from "express";
import varifyJWT from "../middlewares/auth.middleware.js";
import { followUser, getFollowing, getFollowers } from "../controllers/follower.controller.js";

const followerRouter = Router();
followerRouter.use(varifyJWT); // all routes are secured routes and need to be logged in to access these routes

followerRouter.route("/follow/:followed_user").post(followUser);

followerRouter.route("/get-following/:some_user").get(getFollowing);

followerRouter.route("/get-followers/:some_user").get(getFollowers);

export default followerRouter;
