import {
  logInController,
  registerController,
  logOutController,
  refreshAccessToken,
  changePassword,
  currentUser,
  updateAccountDetails,
  updateProfilePic,
  updateCoverPic,
  removeCoverPic,
  removeUser,
  updateBio,
  toggleIsVarify,
  toggleIsPrivateAccount,
} from "../controllers/user.controller.js";
import deleteAllPosts from "../middlewares/deleteAllPosts.middleware.js";
import deleteAllComments from "../middlewares/deleteAllCommentsOfUser.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import varifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "cover_pic", maxCount: 1 },
  ]),
  registerController
);

router.route("/login").post(logInController);

//Secured routes -> need cookies to access these routes

router.route("/logout").post(varifyJWT, logOutController);

router.route("/refresh-access-token").post(refreshAccessToken);

router.route("/change-password").patch(varifyJWT, changePassword);

router.route("/current-user-details").get(varifyJWT, currentUser);

router.route("/update-user-details").patch(varifyJWT, updateAccountDetails);

router.route("/update-profile-pic").post(varifyJWT, upload.fields([
  {name:"new_profile_pic"}
]), updateProfilePic);

router.route("/update-cover-pic").post(varifyJWT, upload.fields([
  {name:"new_cover_pic"}
]), updateCoverPic);

router.route("/remove-cover-pic").delete(varifyJWT, removeCoverPic);

router.route("/update-bio").patch(varifyJWT, updateBio);

router.route("/toggle-is-varify").patch(varifyJWT, toggleIsVarify);

router.route("/toggle-is-private").patch(varifyJWT, toggleIsPrivateAccount);

router.route("/delete-user").delete(varifyJWT, deleteAllComments, deleteAllPosts, removeUser);

export default router;
