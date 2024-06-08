import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import tryCatch from "../utils/trycatch.js";
import Post from "../models/post.model.js";
import LikePost from "../models/like.post.model.js";
import mongoose from "mongoose";

const likePost = tryCatch(async (req, res) => {
  if (!req.params?.post_id) throw new ApiError(400, "Please provide post id");

  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const post = await Post.findById(req.params.post_id);
  if (!post) throw new ApiError(500, "Post fetch failed");

  const like = await LikePost.findOne({ post_id: req.params.post_id, liked_by: req.user._id });

  if (!like) {
    await LikePost.create({
      post_id: req.params.post_id,
      liked_by: req.user._id,
    });
    return res.status(200).json(new ApiResponse(200, "Post liked successfully"));
  }

  if (!like.dislike) {
    await LikePost.findByIdAndDelete(like._id);
    return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
  }

  like.dislike = false;
  await like.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Post liked successfully"));
});

const dislikePost = tryCatch(async (req, res) => {
  if (!req.params?.post_id) throw new ApiError(400, "Please provide post id");

  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const post = await Post.findById(req.params.post_id);
  if (!post) throw new ApiError(500, "Post fetch failed");

  const like = await LikePost.findOne({ post_id: req.params.post_id, liked_by: req.user._id });
  if (!like) {
    await LikePost.create({
      post_id: req.params.post_id,
      liked_by: req.user._id,
      dislike: true,
    });
    return res.status(200).json(new ApiResponse(200, "Post disliked successfully"));
  }

  if (like.dislike) {
    await LikePost.findByIdAndDelete(like._id);
    return res.status(200).json(new ApiResponse(200, "Dislike removed successfully"));
  }

  like.dislike = true;
  await like.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Post disliked successfully"));
});

const likesOnPost = tryCatch(async (req, res) => {
  if (!req.params?.post_id) throw new ApiError(400, "Please provide post id");
  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const likes = await LikePost.aggregate([
    {
      $match: {
        dislike: false,
      },
    },
    {
      $match: {
        post_id: new mongoose.Types.ObjectId(req.params.post_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "liked_by",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        liked_by: "$result.full_name",
        liked_by_username: "$result.username",
        pic: "$result.profile_pic",
        _id: 0,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, "Likes fetched successfully", likes));
});

const dislikesOnPost = tryCatch(async (req, res) => {
  if (!req.params?.post_id) throw new ApiError(400, "Please provide post id");
  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const dislikes = await LikePost.aggregate([
    {
      $match: {
        dislike: true,
      },
    },
    {
      $match: {
        post_id: new mongoose.Types.ObjectId(req.params.post_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "liked_by",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        liked_by: "$result.full_name",
        liked_by_username: "$result.username",
        pic: "$result.profile_pic",
        _id: 0,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, "Dislikes fetched successfully", dislikes));
});

export { likePost, dislikePost, likesOnPost, dislikesOnPost };
