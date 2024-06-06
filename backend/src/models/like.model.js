import { Schema, model } from "mongoose";

const likeSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment_id: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  like: {
    type: Boolean,
    default: false,
  },
  dislike: {
    type: Boolean,
    default: false,
  },
});

const Like = model("Like", likeSchema);
export default Like;
