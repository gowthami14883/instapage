const apiResponse = require("../utils/apiResponse");
const Follower = require("../models/follower.model");
const User = require("../models/user.model");

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.user_id;
    const followingId = req.params.userId;

    if (followerId == followingId) {
      return apiResponse.validationErrorResponse(
        res,
        "You cannot follow yourself"
      );
    }

    const alreadyFollowing = await Follower.findOne({
      where: {
        follower_user_id: followerId,
        following_user_id: followingId
      }
    });

    if (alreadyFollowing) {
      return apiResponse.validationErrorResponse(
        res,
        "You are already following this user"
      );
    }

    const follow = await Follower.create({
      follower_user_id: followerId,
      following_user_id: followingId
    });

    return apiResponse.createdResponse(
      res,
      "User followed successfully",
      follow
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.unfollowUser = async (req, res) => {
  try {
    const deleted = await Follower.destroy({
      where: {
        follower_user_id: req.user.user_id,
        following_user_id: req.params.userId
      }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(
        res,
        "You are not following this user"
      );
    }

    return apiResponse.successResponse(
      res,
      "User unfollowed successfully"
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};


exports.getFollowers = async (req, res) => {
  try {
    const followers = await Follower.findAll({
      where: {
        following_user_id: req.params.userId
      },
      include: [
        {
          model: User,
          as: "FollowerUser", 
          attributes: ["user_id", "username"]
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "Followers fetched successfully",
      followers
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const following = await Follower.findAll({
      where: {
        follower_user_id: req.params.userId
      },
      include: [
        {
          model: User,
          as: "FollowingUser", 
          attributes: ["user_id", "username"]
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "Following list fetched successfully",
      following
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
