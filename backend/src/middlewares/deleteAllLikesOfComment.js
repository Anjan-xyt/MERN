import tryCatch from "../utils/trycatch.js";
import ApiError from "../utils/apiError.js";
import LikeComment from "../models/like.comment.model.js";
import Comment from "../models/comment.model.js";

const deleteAllLikesOfComment = tryCatch(async (req, res, next) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");
  const { comment_id } = req.params;
  if (!comment_id) throw new ApiError(400, "CommentId missing");
  const comment = await Comment.findById(comment_id);
  if (!comment) throw new ApiError(500, "Comment not found");
  if (!comment.comment_by.equals(req.user._id)) throw new ApiError(500, "Comment is not done by you");

  await LikeComment.deleteMany({ comment_id });

  next();
});

export default deleteAllLikesOfComment;
