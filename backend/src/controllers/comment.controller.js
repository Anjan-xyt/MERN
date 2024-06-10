import Comment from "../models/comment.model.js";
import LikeComment from "../models/like.comment.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import tryCatch from "../utils/trycatch.js";
import mongoose from "mongoose";

const addComment = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.post_id) throw new ApiError(401, "Please provide post id");

  const { content } = req.body;
  if (!content.trim()) throw new ApiError(400, "Please fill the comment field");

  const comment = await Comment.create({
    post_id: req.params.post_id,
    comment_by: req.user._id,
    content: content.trim(),
  });

  res.status(200).json(new ApiResponse(201, "Comment successful", comment));
});

const getAllComments = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");

  const { post_id } = req.params;
  if (!post_id) throw new ApiError(400, "PostId missing");

  const comments = await Comment.aggregate([
    {
      $match: {
        post_id: new mongoose.Types.ObjectId(post_id),
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, "Comments fetched successfully", comments));
});

const updateComment = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");

  const { post_id, comment_id } = req.params;
  if (!post_id || !comment_id) throw new ApiError(400, "PostId or CommentId missing");

  const comment = await Comment.findById(comment_id);
  if (!comment) throw new ApiError(500, "Comment not found");

  const isCommentValid = await comment.isCommentVarified(req.user._id, post_id);
  console.log(isCommentValid);
  if (!isCommentValid) throw new ApiError(400, "This comment is not done by you");

  if (!req.body.content) throw new ApiError(400, "Fill the comment field");
  if (!req.body.content?.trim()) throw new ApiError(400, "Fill the comment field");

  comment.content = req.body.content.trim();
  comment.isEdited = true;
  await comment.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Comment updated successfully", { comment }));
});

const deleteComment = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");

  const { post_id, comment_id } = req.params;
  if (!post_id || !comment_id) throw new ApiError(400, "PostId or CommentId missing");

  const comment = await Comment.findById(comment_id);
  if (!comment) throw new ApiError(500, "Comment not found");

  const isCommentValid = await comment.isCommentVarified(req.user._id, post_id);
  console.log(isCommentValid);
  if (!isCommentValid) throw new ApiError(400, "This comment is not done by you");

  await LikeComment.deleteMany({ comment_id });//deletes all the likes associated with the comment

  await Comment.findByIdAndDelete(comment_id);//deletes the comment

  res.status(200).json(new ApiResponse(200, "Comment deleted successfully", { comment }));
});

export { addComment, updateComment, deleteComment, getAllComments };
