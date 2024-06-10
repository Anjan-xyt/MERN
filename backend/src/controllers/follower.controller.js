import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import tryCatch from "../utils/trycatch.js";
import Follower from "../models/follower.model.js";
import mongoose from "mongoose";

const followUser = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.followed_user) throw new ApiError(400, "Please provide following id");

  if (req.user._id.equals(req.params.followed_user)) throw new ApiError(400, "You can't follow yourself");

  const follow = await Follower.findOne({
    followed_user: req.params.followed_user,
    followed_by: req.user._id,
  });
  const followback = await Follower.findOne({
    followed_user: req.user._id,
    followed_by: req.params.followed_user,
  });

  if (!follow && !followback) {
    await Follower.create({
      followed_user: req.params.followed_user,
      followed_by: req.user._id,
    });
  } else if (!follow && followback) {
    followback.isFollowedBack = true;
    await followback.save({ validateBeforeSave: false });

    await Follower.create({
      followed_user: req.params.followed_user,
      followed_by: req.user._id,
      isFollowedBack: true,
    });
  } else if (follow && !followback) {
    await Follower.findByIdAndDelete(follow._id);
  } else if (follow && followback) {
    await Follower.findByIdAndDelete(follow._id);

    followback.isFollowedBack = false;
    followback.save({ validateBeforeSave: false });
  }
  res.status(200).json(new ApiResponse(200, "User followed successfully"));
});

const getFollowing = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.some_user) throw new ApiError(401, "Please provide following id");

  const following = await Follower.aggregate([
    {
      $match: {
        followed_by:new mongoose.Types.ObjectId(req.params.some_user)
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'followed_by',
        foreignField: '_id',
        as: 'follower'
      }
    },
    {
      $unwind:'$follower'
    },
    {
      $addFields: {
        full_name:	'$follower.full_name',
        username:'$follower.username'
      }
    },
    {
      $project: {
        _id:0,
        full_name:1,
        username:1,
        isFollowedBack:1
      }
    }
  ])

  res.status(200).json(new ApiResponse(200,"following data fetched successfully", following));
})

const getFollowers = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.some_user) throw new ApiError(401, "Please provide following id");

    const followers = await Follower.aggregate([
        {
          $match: {
            followed_user: new mongoose.Types.ObjectId(req.params.some_user)
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "followed_user",
            foreignField: "_id",
            as: "following"
          }
        },
        {
          $unwind: "$following"
        },
        {
          $addFields: {
            full_name: "$following.full_name",
            username: "$following.username"
          }
        },
        {
          $project: {
            _id: 0,
            full_name: 1,
            username: 1,
            isFollowedBack: 1
          }
        }
      ])
      res.status(200).json(new ApiResponse(200, "followers data fetched successfully", followers));
})

export { followUser, getFollowing, getFollowers };
