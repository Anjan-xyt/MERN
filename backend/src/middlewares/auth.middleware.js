import tryCatch from "../utils/trycatch.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

const varifyJWT = tryCatch(async (req, res, next) => {

  const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized request");

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    httpOnly: true,
    secure: true,
  });
  
  const user = await User.findById(decodedToken?._id).select("-password -refresh_token");

  if (!user) throw new ApiError(401, "Invalid access token");

  req.user = user;

  next()
});

export default varifyJWT; //file details available in req.file/files
