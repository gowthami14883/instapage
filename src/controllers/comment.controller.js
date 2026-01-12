const apiResponse = require("../utils/apiResponse");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      post_id: req.params.postId,
      user_id: req.user.user_id
    });

    const commentDetails = await Comment.findOne({
      where: { comment_id: comment.comment_id },
      include: [
        {
          model: User,
          attributes: ["user_id", "username"]
        },
        {
          model: Post,
          attributes: ["post_id", "caption", "media_url"],
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.successResponse(res, "Comment added successfully", {
      comment: commentDetails.text,
      commented_by: commentDetails.User,
      post: {
        post_id: commentDetails.Post.post_id,
        caption: commentDetails.Post.caption,
        media_url: commentDetails.Post.media_url,
        posted_by: commentDetails.Post.User
      }
    });

  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.postId },
      include: [
        {
          model: User,
          attributes: ["user_id", "username"]
        },
        {
          model: Post,
          attributes: ["post_id"],
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "Comments fetched successfully",
      comments
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        comment_id: req.params.commentId,
        user_id: req.user.user_id
      }
    });

    if (!comment) {
      return apiResponse.notFoundResponse(res, "Comment not found");
    }

    await comment.update({
      text: req.body.text
    });

    return apiResponse.successResponse(
      res,
      "Comment updated successfully",
      comment
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: {
        comment_id: req.params.commentId,
        user_id: req.user.user_id
      }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(res, "Comment not found");
    }

    return apiResponse.successResponse(
      res,
      "Comment deleted successfully"
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id", "username"]
        },
        {
          model: Post,
          attributes: ["post_id"],
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "All comments fetched successfully",
      comments
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
