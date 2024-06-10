import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import tryCatch from "../utils/trycatch.js";
import imgUploadOnCloud from "../utils/imgUploadOnCloud.js";
import deleteImageOnCloud from "../utils/imgDeleteOnCloud.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken";

const registerController = tryCatch(async (req, res) => {
  let { full_name, username, email, password, date_of_birth } = req.body;

  const existingUserWithUsername = await User.findOne({ username });
  const existingUserWithEmail = await User.findOne({ email });

  if (existingUserWithUsername) throw new ApiError(400, "Choose a different username");
  if (existingUserWithEmail) throw new ApiError(400, "User with this email already exists");

  if (!req.files.profile_pic) throw new ApiError(401, "Please select an image");

  let profile_pic = await imgUploadOnCloud(req.files.profile_pic[0].path);

  let cover_pic = "";

  if (req.files.cover_pic) {
    cover_pic = await imgUploadOnCloud(req.files.cover_pic[0].path);
  }

  await User.create({
    full_name,
    username,
    email,
    password,
    date_of_birth,
    profile_pic,
    cover_pic,
  });
  return res.json(new ApiResponse(201, `${full_name} registered successfully`));
});

const logInController = tryCatch(async (req, res) => {
  const { email, username, password } = req.body;

  if (!password) throw new ApiError(400, "fill the password");

  if (!email && !username) throw new ApiError(400, "fill all the fields properly");

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(400, "User not registered");

  const isPasswordVarified = await user.isPasswordCorrect(password);

  if (!isPasswordVarified) throw new ApiError(401, "Password Incorrect");

  const { access_token, refresh_token } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refresh_token");

  return res
    .status(200)
    .cookie("access_token", access_token, { httpOnly: true, secure: true })
    .cookie("refresh_token", refresh_token, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(200, `${user.full_name} logged in successfully`, {
        user: loggedInUser,
        access_token,
        refresh_token,
      })
    );
});

const logOutController = tryCatch(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: "", // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("access_token", { httpOnly: true, secure: true })
    .clearCookie("refresh_token", { httpOnly: true, secure: true })
    .json(new ApiResponse(200, `${req.user.username} logged out successfully`));
});

const refreshAccessToken = tryCatch(async (req, res) => {
  const received_refresh_token = req.cookies.refresh_token || req.body.refresh_token;

  if (!received_refresh_token) throw new ApiError(401, "Unauthorized request 1");

  const decodedToken = jwt.verify(received_refresh_token, process.env.REFRESH_TOKEN_SECRET, {
    httpOnly: true,
    secure: true,
  });

  const user = await User.findById(decodedToken?._id);

  if (!user) throw new ApiError(401, "Invalid refresh token 2");

  if (received_refresh_token !== user?.refresh_token) {
    throw new ApiError(401, "Invalid refresh token 3");
  }

  const { access_token, refresh_token } = await generateAccessAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("access_token", access_token, { httpOnly: true, secure: true })
    .cookie("refresh_token", refresh_token, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(200, "Access token refreshed successfully", {
        access_token,
        refresh_token,
      })
    );
});

const changePassword = tryCatch(async (req, res) => {
  const { old_password, new_password } = req.body;
  if (!old_password || !new_password) throw new ApiError(400, "fill all the fields");

  const user = await User.findById(req.user);

  const isPasswordVarified = await user.isPasswordCorrect(old_password);
  if (!isPasswordVarified) throw new ApiError(401, "Password Incorrect");

  user.password = new_password;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Password Changed Successfully"));
});

const currentUser = tryCatch(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "User fetched successfully", req.user));
});

const updateAccountDetails = tryCatch(async (req, res) => {
  let { _id, full_name, date_of_birth } = req.user;
  const { new_full_name, new_date_of_birth } = req.body;

  if (new_full_name?.trim() !== "") full_name = new_full_name;
  if (new_date_of_birth?.trim() !== "") date_of_birth = new_date_of_birth;

  const user = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        full_name,
        date_of_birth,
      },
    },
    {
      new: true,
    }
  ).select("-password -refresh_token");

  res.status(200).json(new ApiResponse(200, "Account Details Updated Successfully", user));
});

const updateProfilePic = tryCatch(async (req, res) => {
  if (!req.files.new_profile_pic) throw new ApiError(401, "Please select an image");

  await deleteImageOnCloud(req.user.profile_pic);

  const profile_pic = await imgUploadOnCloud(req.files.new_profile_pic[0].path);
  if (!profile_pic) throw new ApiError(500, "Image upload failed");

  const user = await User.findById(req.user._id);
  user.profile_pic = profile_pic;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Profile Picture Updated Successfully"));
});

const updateCoverPic = tryCatch(async (req, res) => {
  if (!req.files.new_cover_pic) throw new ApiError(401, "Please select an image");

  await deleteImageOnCloud(req.user.cover_pic);

  const cover_pic = await imgUploadOnCloud(req.files.new_cover_pic[0].path);
  if (!cover_pic) throw new ApiError(500, "Image upload failed");

  const user = await User.findById(req.user._id);
  user.cover_pic = cover_pic;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Cover Picture Updated Successfully"));
});

const removeCoverPic = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.cover_pic) throw new ApiError(401, "No cover picture found");
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      cover_pic: 1,
    },
  });
  if (!req.user.cover_pic) throw new ApiError(401, "No cover picture found");
  await deleteImageOnCloud(req.user.cover_pic);
  res.send(new ApiResponse(200, "Cover Picture Removed Successfully"));
});

const updateBio = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not found");
  const user = await User.findByIdAndUpdate(req.user._id, {
    $set: {
      bio: req.body.bio || "",
    },
  }).select("-password -refresh_token");
  res.status(200).json(new ApiResponse(200, "Bio Updated Successfully"));
});

const toggleIsVarify = tryCatch(async (req, res) => {
  if (!req.user) new ApiError(401, "User not found");
  const user = await User.findById(req.user._id);

  user.isVarified = !user.isVarified;
  user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "User Varification Status Updated Successfully", { isVarified: user.isVarified }));
});

const toggleIsPrivateAccount = tryCatch(async (req, res) => {
  if (!req.user) new ApiError(401, "User not found");
  const user = await User.findById(req.user._id);

  user.isPrivateAccount = !user.isPrivateAccount;
  user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(200, "User Privacy Status Updated Successfully", { isPrivateAccount: user.isPrivateAccount })
    );
});

const removeUser = tryCatch(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  if (req.user.cover_pic) await deleteImageOnCloud(req.user.cover_pic);
  await deleteImageOnCloud(req.user.profile_pic);
  res.status(200).json(new ApiResponse(200, "User deleted successfully", req.user));
});

export {
  registerController,
  logInController,
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
};
