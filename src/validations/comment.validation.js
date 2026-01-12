const { body } = require("express-validator");

exports.createCommentValidation = [
  body("text")
    .notEmpty().withMessage("Comment text is required")
    .isString()
    .isLength({ max: 300 }).withMessage("Comment too long")
];

exports.updateCommentValidation = [
  body("text")
    .notEmpty()
    .isString()
    .isLength({ max: 300 })
];
