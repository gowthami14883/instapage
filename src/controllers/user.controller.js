const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Like = require("../models/like.model");
const Comment = require("../models/comment.model");
const Follower = require("../models/follower.model");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return apiResponse.createdResponse(res, "User registered", user);
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return apiResponse.unauthorizedResponse(res, "Invalid password");
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return apiResponse.successResponse(res, "Login successful", { token });
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });

    return apiResponse.successResponse(res, "Users fetched", users);
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    return apiResponse.successResponse(res, "User fetched", user);
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updated = await User.update(req.body, {
      where: { user_id: req.params.id }
    });

    if (updated[0] === 0) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    return apiResponse.successResponse(res, "User updated successfully");
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    return apiResponse.successResponse(res, "User deleted successfully");
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; 

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    return apiResponse.successResponse(res, "Profile fetched", user);
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};


exports.getUserFullProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["user_id", "username", "email"],

      include: [
        {
          model: Post,
          attributes: ["post_id", "media_url", "caption", "createdAt"],
          include: [
            {
              model: Like,
              include: {
                model: User,
                attributes: ["user_id", "username"]
              }
            },
            {
              model: Comment,
              include: {
                model: User,
                attributes: ["user_id", "username"]
              }
            }
          ]
        },

        {
          model: Follower,
          as: "Followers",
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        },

        {
          model: Follower,
          as: "Following",
          include: {
            model: User,
            attributes: ["user_id", "username"]
          }
        }
      ]
    });

    return apiResponse.successResponse(
      res,
      "User full profile fetched",
      user
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
