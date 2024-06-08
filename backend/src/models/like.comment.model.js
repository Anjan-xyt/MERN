import { Schema, model } from "mongoose";

const likeCommentSchema = new Schema({
  comment_id: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dislike:{
    type: Boolean,
    default: false
  }
});

const LikeComment = model("LikeComment", likeCommentSchema);
export default LikeComment;
