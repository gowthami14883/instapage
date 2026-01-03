const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { chatValidation } = require("../validations/chat.validation");
const chatController = require("../controllers/chat.controller");

router.post("/:receiverId", auth, chatValidation, validate, chatController.sendMessage);

module.exports = router;
