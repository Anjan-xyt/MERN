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
} from "../controllers/user.controller.js";
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

router.route("/change-password").post(varifyJWT, changePassword);

router.route("/current-user").post(varifyJWT, currentUser);

router.route("/update-user").post(varifyJWT, updateAccountDetails);

router.route("/update-profile-pic").post(varifyJWT, upload.fields([
  {name:"new_profile_pic"}
]), updateProfilePic);

router.route("/update-cover-pic").post(varifyJWT, upload.fields([
  {name:"new_cover_pic"}
]), updateCoverPic);

router.route("/remove-cover-pic").delete(varifyJWT, removeCoverPic);

router.route("/delete-user").delete(varifyJWT, removeUser);

export default router;
