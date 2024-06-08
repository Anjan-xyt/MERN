import { Schema, model } from "mongoose";

const likePostSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dislike:{
    type: Boolean,
    default: false
  }
});

const LikePost = model("LikePost", likePostSchema);
export default LikePost;



