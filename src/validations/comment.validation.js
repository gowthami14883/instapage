const { body } = require("express-validator");

exports.commentValidation = [
  body("text").notEmpty().withMessage("Comment required")
];
