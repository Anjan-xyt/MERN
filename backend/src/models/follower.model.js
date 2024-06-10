import { Schema, model } from "mongoose";

const followerSchema = new Schema(
  {
    followed_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFollowedBack:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Follower = model("Follower", followerSchema);
export default Follower;
