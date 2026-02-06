const { Op } = require("sequelize");
const apiResponse = require("../utils/apiResponse");
const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
  try {
    const message = await Chat.create({
      sender_id: req.user.user_id,
      receiver_id: req.params.receiverId,
      message: req.body.message
    });

    return apiResponse.createdResponse(res, "Message sent", message);
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.getChats = async (req, res) => {
  try {
    const myId = req.user.user_id;
    const otherId = req.params.userId;

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { sender_id: myId, receiver_id: otherId },
          { sender_id: otherId, receiver_id: myId }
        ]
      },
      order: [["createdAt", "ASC"]]
    });

    return apiResponse.successResponse(res, "Chats fetched", chats);
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      where: {
        chat_id: req.params.messageId,
        sender_id: req.user.user_id
      }
    });

    if (!chat) {
      return apiResponse.notFoundResponse(res, "Message not found");
    }

    await chat.update({ message: req.body.message });

    return apiResponse.successResponse(
      res,
      "Message updated",
      chat
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Chat.destroy({
      where: {
        chat_id: req.params.messageId,
        sender_id: req.user.user_id
      }
    });

    if (!deleted) {
      return apiResponse.notFoundResponse(res, "Message not found");
    }

    return apiResponse.successResponse(
      res,
      "Message deleted"
    );
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
