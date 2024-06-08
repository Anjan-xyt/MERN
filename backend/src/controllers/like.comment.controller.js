import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import tryCatch from "../utils/trycatch.js";
import Comment from "../models/comment.model.js";
import LikeComment from "../models/like.comment.model.js";
import mongoose from "mongoose";

const likeComment = tryCatch(async (req, res) => {
  if (!req.params?.comment_id) throw new ApiError(400, "Please provide comment id");

  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const comment = await Comment.findById(req.params.comment_id);
  if (!comment) throw new ApiError(500, "Comment fetch failed");

  const like = await LikeComment.findOne({ comment_id: req.params.comment_id, liked_by: req.user._id });

  if (!like) {
    await LikeComment.create({
      comment_id: req.params.comment_id,
      liked_by: req.user._id,
    });
    return res.status(200).json(new ApiResponse(200, "Comment liked successfully"));
  }

  if (!like.dislike) {
    await LikeComment.findByIdAndDelete(like._id);
    return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
  }

  like.dislike = false;
  await like.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Comment liked successfully"));
});

const dislikeComment = tryCatch(async (req, res) => {
  if (!req.params?.comment_id) throw new ApiError(400, "Please provide comment id");

  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const comment = await Comment.findById(req.params.comment_id);
  if (!comment) throw new ApiError(500, "Comment fetch failed");

  const like = await LikeComment.findOne({ comment_id: req.params.comment_id, liked_by: req.user._id });
  if (!like) {
    await LikeComment.create({
      comment_id: req.params.comment_id,
      liked_by: req.user._id,
      dislike: true,
    });
    return res.status(200).json(new ApiResponse(200, "Comment disliked successfully"));
  }

  if (like.dislike) {
    await LikeComment.findByIdAndDelete(like._id);
    return res.status(200).json(new ApiResponse(200, "Dislike removed successfully"));
  }

  like.dislike = true;
  await like.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Comment disliked successfully"));
});

const likesOnComment = tryCatch(async (req, res) => {
  if (!req.params?.comment_id) throw new ApiError(400, "Please provide comment id");
  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const likes = await LikeComment.aggregate([
    {
      $match: {
        dislike: false,
      },
    },
    {
      $match: {
        comment_id: new mongoose.Types.ObjectId(req.params.comment_id),
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

const dislikesOnComment = tryCatch(async (req, res) => {
  if (!req.params?.comment_id) throw new ApiError(400, "Please provide comment id");
  if (!req.user?._id) throw new ApiError(400, "User not authorized");

  const dislikes = await LikeComment.aggregate([
    {
      $match: {
        dislike: true,
      },
    },
    {
      $match: {
        comment_id: new mongoose.Types.ObjectId(req.params.comment_id),
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

export { likeComment, dislikeComment, likesOnComment, dislikesOnComment };
