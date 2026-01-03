const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
  const chat = await Chat.create({
    sender_id: req.user.user_id,
    receiver_id: req.params.receiverId,
    message: req.body.message
  });
  res.json(chat);
};
