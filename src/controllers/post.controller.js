const apiResponse = require("../utils/apiResponse");
const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return apiResponse.validationErrorResponse(
        res,
        "Media file is required"
      );
    }

    const post = await Post.create({
      user_id: req.user.user_id,
      media_url: req.file.path,   
      caption: req.body.caption
    });

    return apiResponse.createdResponse(
      res,
      "Post created successfully",
      {
        post_id: post.post_id,
        user_id: post.user_id,
        media_url: post.media_url,
        caption: post.caption,
        createdAt: post.createdAt
      }
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.user.user_id }
    });

    return apiResponse.successResponse(
      res,
      "My posts fetched successfully",
      posts
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll(); // Fetch all posts
    return apiResponse.successResponse(res, "All posts fetched successfully", posts);
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        post_id: req.params.postId,
        user_id: req.user.user_id
      }
    });

    if (!post) {
      return apiResponse.notFoundResponse(res, "Post not found");
    }

    await post.update({
      caption: req.body.caption
    });

    return apiResponse.successResponse(
      res,
      "Post updated successfully",
      post
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: {
        post_id: req.params.postId,
        user_id: req.user.user_id
      }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(res, "Post not found");
    }

    return apiResponse.successResponse(
      res,
      "Post deleted successfully"
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
