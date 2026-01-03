const { body } = require("express-validator");

exports.registerValidation = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 chars"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),

  body("phone")
    .optional()
    .isMobilePhone("any").withMessage("Invalid phone number"),

  body("dateofbirth")
    .optional()
    .isISO8601().withMessage("Invalid date format"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other")
];

exports.loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
];

exports.updateUserValidation = [
  body("username").optional().isLength({ min: 3 }),
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }),
  body("phone").optional().isMobilePhone("any"),
  body("gender").optional().isIn(["male", "female", "other"])
];
