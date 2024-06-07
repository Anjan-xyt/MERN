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

postSchema.methods.isUserVarified = async function (user_id) {
  if (user_id.equals(this.created_by)) return true;
  return false;
};

const Post = model("Post", postSchema);
export default Post;
