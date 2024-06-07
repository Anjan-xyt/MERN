import tryCatch from "../utils/trycatch.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import imgUploadOnCloud from "../utils/imgUploadOnCloud.js";
import deleteImageOnCloud from "../utils/imgDeleteOnCloud.js";
import mongoose from "mongoose";

const createPost = tryCatch(async (req, res) => {
  if (!req.files.post_img) throw new ApiError(401, "Please select an image");
  const post_url = await imgUploadOnCloud(req.files.post_img[0]?.path);

  const { caption, description } = req.body;
  if (!caption?.trim()) throw new ApiError(401, "Please fill the caption field");

  if (!req.user._id) throw new ApiError(401, "User not found");

  const post = await Post.create({
    caption,
    description,
    post_url,
    created_by: req.user._id,
  });
  if (!post) throw new ApiError(500, "Post creation failed");

  res.status(200).json(new ApiResponse(200, "Post created successfully", post));
});

const getAllPosts = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not found");
  if (!req.user?._id) throw new ApiError(401, "User not found");

  const details = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "posts", // Name of the collection to join with
        localField: "_id", // Field from the current collection
        foreignField: "created_by", // Field from the joined collection
        as: "posts", // Name of the field to store the joined documents
      },
    },
    {
      $addFields: {
        post_count: {
          $size: "$posts",
        },
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        full_name: 1,
        post_count: 1,
        posts: 1,
      },
    },
  ]);
  res.status(200).json(new ApiResponse(200, "Post details fetched successfully", details));
});

const currrentPostDetails = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.params?.post_id) throw new ApiError(401, "Please provide post id");

  const post = await Post.findById(req.params.post_id);

  if (!post) throw new ApiError(500, "Post fetch failed");

  res.status(200).json(new ApiResponse(200, "Post details fetched successfully", post));
});

const deletePost = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.user._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.post_id) throw new ApiError(401, "Please provide post id");

  const post = await Post.findById(req.params.post_id);
  if (!post) throw new ApiError(500, "Post fetch failed");

  const isUserAuthorized = await post.isUserVarified(req.user._id);
  if (!isUserAuthorized)
    throw new ApiError(400, "You are not authorized to delete this post since you didn't create it");

  const deletedPost = await Post.findByIdAndDelete(post._id);
  if (!deletedPost) throw new ApiError(500, "Post deletion failed");
  await deleteImageOnCloud(post.post_url);

  res.status(200).json(new ApiResponse(201, "Post deleted successfully", deletedPost));
});

const deleteAllPosts = tryCatch(async (req, res, next) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.user._id) throw new ApiError(401, "User not authorized");

  const allPostURLs = await Post.aggregate([
    //returns an array having objects containing only key "post_url"
    {
      $match: {
        created_by: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $project: {
        post_url: 1,
        _id: 0,
      },
    },
  ]);

  allPostURLs.forEach(async (obj) => {
    try {
      await deleteImageOnCloud(obj.post_url);
    } catch (error) {
      throw new ApiError(500, "Failed to delete images from cloud");
    }
  });

  const allDeletedPosts = await Post.deleteMany({ created_by: req.user._id });
  if (!allDeletedPosts) throw new ApiError(500, "Post deletion failed");

  res.status(200).json(new ApiResponse(200, "All Posts Deleted Successfully", allDeletedPosts));
});

export { createPost, getAllPosts, currrentPostDetails, deletePost, deleteAllPosts };
