const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const chatController = require("../controllers/chat.controller");
const { sendMessageValidation,updateMessageValidation} = require("../validations/chat.validation");

router.post( "/:receiverId",auth,sendMessageValidation,validate,chatController.sendMessage);
router.get("/:userId", auth, chatController.getChats);
router.put( "/:messageId",auth,updateMessageValidation,validate,chatController.updateMessage);
router.delete("/:messageId",auth,chatController.deleteMessage);

module.exports = router;
