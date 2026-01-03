const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  const post = await Post.create({
    user_id: req.user.user_id,
    ...req.body
  });
  res.status(201).json(post);
};

exports.getMyPosts = async (req, res) => {
  const posts = await Post.findAll({
    where: { user_id: req.user.user_id }
  });
  res.json(posts);
};
