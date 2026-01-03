const Follower = require("../models/follower.model");

exports.followUser = async (req, res) => {
  await Follower.create({
    follower_user_id: req.user.user_id,
    following_user_id: req.params.userId
  });
  res.json({ message: "Followed" });
};
