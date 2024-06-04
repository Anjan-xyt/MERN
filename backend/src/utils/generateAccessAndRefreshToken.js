import User from "../models/user.model.js";
import ApiError from "./apiError.js";

async function generateAccessAndRefreshToken(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    const access_token = await user.generateAccessToken();
    const refresh_token = await user.generateRefreshToken();

    user.refresh_token = refresh_token;
    user.save({ validateBeforeSave: false });

    return { access_token, refresh_token };
  } catch (err) {
    throw new ApiError(500, "Something went wrong generating access and refresh token");
  }
}

export default generateAccessAndRefreshToken;