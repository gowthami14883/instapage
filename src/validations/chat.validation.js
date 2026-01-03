const { body } = require("express-validator");

exports.chatValidation = [
  body("message").notEmpty().withMessage("Message required")
];
