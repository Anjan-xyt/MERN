import tryCatch from "../utils/trycatch.js";
import ApiError from "../utils/apiError.js";
import Post from "../models/post.model.js";
import mongoose from "mongoose";
import deleteImageOnCloud from "../utils/imgDeleteOnCloud.js";



const deleteAllPosts = tryCatch(async (req, res, next) => {
    if (!req.user) throw new ApiError(401, "User not authorized");
    if (!req.user._id) throw new ApiError(401, "User not authorized");
  
    const allPostURLs = await Post.aggregate([
      //returns an array having objects containing only key "post_url"
      {
        $match: {
          created_by: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          post_url: 1,
          _id: 0,
        },
      },
    ]);
  
    allPostURLs.forEach(async (obj) => {
      try {
        await deleteImageOnCloud(obj.post_url);
      } catch (error) {
        throw new ApiError(500, "Failed to delete images from cloud");
      }
    });
  
    const allDeletedPosts = await Post.deleteMany({ created_by: req.user._id });
    if (!allDeletedPosts) throw new ApiError(500, "Post deletion failed");
  
    next();
  });

  export default deleteAllPosts;