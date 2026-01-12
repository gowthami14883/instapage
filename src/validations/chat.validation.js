const { body } = require("express-validator");

exports.sendMessageValidation = [
  body("message")
    .notEmpty().withMessage("Message is required")
    .isString()
    .isLength({ max: 1000 })
];

exports.updateMessageValidation = [
  body("message")
    .notEmpty()
    .isString()
    .isLength({ max: 1000 })
];
