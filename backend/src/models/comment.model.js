import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment_by: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
