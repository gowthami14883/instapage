const Comment = require("../models/comment.model");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    text: req.body.text,
    user_id: req.user.user_id,
    post_id: req.params.postId
  });
  res.json(comment);
};
