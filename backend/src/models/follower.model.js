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
  },
  { timestamps: true }
);

const Follower = model("Follower", followerSchema);
export default Follower;
