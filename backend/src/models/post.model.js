import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    post_url: {
      type: String,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
