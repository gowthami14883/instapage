const { body } = require("express-validator");

exports.createPostValidation = [
  body("media_url").notEmpty().withMessage("Media URL required"),
  body("caption").optional()
];
