const apiResponse = require("../utils/apiResponse");
const Like = require("../models/like.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");


exports.likePost = async (req, res) => {
  try {
    const alreadyLiked = await Like.findOne({
      where: {
        post_id: req.params.postId,
        user_id: req.user.user_id
      }
    });

    if (alreadyLiked) {
      return apiResponse.validationErrorResponse(
        res,
        "You already liked this post"
      );
    }

    const like = await Like.create({
      post_id: req.params.postId,
      user_id: req.user.user_id
    });

    const likeDetails = await Like.findOne({
      where: { like_id: like.like_id },
      include: [
        {
          model: User,
          attributes: ["user_id", "username"]
        },
        {
          model: Post,
          attributes: ["post_id", "media_url", "caption"],
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.createdResponse(
      res,
      "Post liked successfully",
      {
        liked_by: likeDetails.User,
        post: {
          post_id: likeDetails.Post.post_id,
          media_url: likeDetails.Post.media_url,
          caption: likeDetails.Post.caption,
          posted_by: likeDetails.Post.User
        }
      }
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.unlikePost = async (req, res) => {
  try {
    const deleted = await Like.destroy({
      where: {
        post_id: req.params.postId,
        user_id: req.user.user_id
      }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(res, "Like not found");
    }

    return apiResponse.successResponse(
      res,
      "Post unliked successfully"
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id", "username"]
        },
        {
          model: Post,
          attributes: ["post_id", "media_url", "caption"],
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "All likes fetched successfully",
      likes
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.getLikesByPost = async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { post_id: req.params.postId },
      include: {
        model: User,
        attributes: ["user_id", "username"]
      }
    });

    return apiResponse.successResponse(
      res,
      "Post likes fetched successfully",
      likes
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
