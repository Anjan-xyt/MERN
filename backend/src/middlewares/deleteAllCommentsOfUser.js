import tryCatch from "../utils/trycatch.js";
import ApiError from "../utils/apiError.js";
import Comment from "../models/comment.model.js";
import mongoose from "mongoose";

const deleteAllComments = tryCatch(async (req, _, next) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.user._id) throw new ApiError(401, "User not authorized");

  const allComments = await Comment.aggregate([
    {
      $match: {
        comment_by: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);

  if (!allComments) throw new ApiError(500, "Failed to delete comments");

  await Comment.deleteMany({
    _id: {
      $in: allComments,
    },
  });

  next();
});

export default deleteAllComments;
