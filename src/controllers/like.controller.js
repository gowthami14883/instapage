const Like = require("../models/like.model");

exports.likePost = async (req, res) => {
  await Like.create({
    post_id: req.params.postId,
    user_id: req.user.user_id
  });
  res.json({ message: "Post liked" });
};
