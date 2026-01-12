const { body } = require("express-validator");


exports.createPostValidation = [
  body("caption")
    .optional()
    .isString()
    .withMessage("Caption must be text")
];

exports.updatePostValidation = [
  body("caption")
    .optional()
    .isString()
    .withMessage("Caption must be text")
];
