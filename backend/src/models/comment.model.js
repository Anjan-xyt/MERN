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
    isEdited: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

commentSchema.methods.isCommentVarified = function(comment_by, post_id) {
  if(this.comment_by.equals(comment_by) && this.post_id.equals(post_id)){
    return true;
  }else{
    return false
  }
}

const Comment = model("Comment", commentSchema);
export default Comment;
