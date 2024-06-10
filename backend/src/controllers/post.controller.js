import tryCatch from "../utils/trycatch.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Post from "../models/post.model.js";
import LikePost from "../models/like.post.model.js";
import Comment from "../models/comment.model.js";
import LikeComment from "../models/like.comment.model.js";
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

  const posts = await Post.aggregate([
    {
      $match: {
        created_by: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $project: {
        _id: 0,
        caption: 1,
        description: 1,
        post_url: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, "Post details fetched successfully", posts));
});

const currrentPostDetails = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.params?.post_id) throw new ApiError(401, "Please provide post id");

  const post = await Post.findById(req.params.post_id).select("-_id -__v");

  if (!post) throw new ApiError(500, "Post fetch failed");

  res.status(200).json(new ApiResponse(200, "Post details fetched successfully", post));
});

const updatePostDetails = tryCatch(async (req, res) => {
  if (!req.user) throw new ApiError(401, "User not authorized");
  if (!req.user._id) throw new ApiError(401, "User not authorized");
  if (!req.params?.post_id) throw new ApiError(401, "Please provide post id");
  if (!req.body) throw new ApiError(401, "Please provide post details");

  const { caption, description } = req.body;
  if (!caption?.trim()) throw new ApiError(400, "Provide a caption");

  const post = await Post.findById(req.params.post_id);
  if (!post) throw new ApiError(500, "Post fetch failed");

  const isUserAuthorized = await post.isUserVarified(req.user._id);
  if (!isUserAuthorized) {
    throw new ApiError(400, "You are not authorized to update this post since you didn't create it");
  }

  post.caption = caption?.trim();
  post.description = description?.trim();
  await post.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Post details updated successfully"));
});

const updatePostImage = tryCatch(async (req, res) => {
  if (!req.user?._id) throw new ApiError(401, "User not authorized");

  if (!req.params?.post_id) throw new ApiError(400, "Please provide post id");
  if (!req.files?.post_img[0]) throw new ApiError(400, "Please provide post image");

  const post = await Post.findById(req.params.post_id);
  if (!post) throw new ApiError(500, "Post fetch failed");

  const isUserAuthorized = await post.isUserVarified(req.user._id);
  if (!isUserAuthorized) {
    throw new ApiError(400, "You are not authorized to update this post since you didn't create it");
  }
  await deleteImageOnCloud(post.post_url);
  const post_url = await imgUploadOnCloud(req.files.post_img[0].path);
  if (!post_url) throw new ApiError(500, "Failed to upload image");

  post.post_url = post_url;
  await post.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "Post image updated successfully", { post_url }));
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

  const likecomments = await Comment.aggregate([
    //returns all the likes on the comments of the post
    {
      $match: {
        post_id: new mongoose.Types.ObjectId(post._id),
      },
    },
    {
      $lookup: {
        from: "likecomments",
        localField: "_id",
        foreignField: "comment_id",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $addFields: {
        tobedeleted: "$result._id",
      },
    },
    {
      $project: {
        _id: 0,
        tobedeleted: 1,
      },
    },
  ]);

  console.log(likecomments);

  likecomments.forEach(async (likecomment) => {
    await LikeComment.findByIdAndDelete(likecomment.tobedeleted);
  }); //deletes all the likes on the comments of the post

  await Comment.deleteMany({ post_id: post._id }); //deletes all the comments of the post

  await LikePost.deleteMany({ post_id: post._id }); //deletes all the likes of the post

  await deleteImageOnCloud(post.post_url); //delete the image from cloud
  const deletedPost = await Post.findByIdAndDelete(post._id); //deletes the post
  if (!deletedPost) throw new ApiError(500, "Post deletion failed");

  res.status(200).json(new ApiResponse(201, "Post deleted successfully", deletedPost));
});

export { createPost, getAllPosts, currrentPostDetails, deletePost, updatePostDetails, updatePostImage };
