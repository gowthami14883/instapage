const { body } = require("express-validator");
const User = require("../models/user.model");

exports.registerValidation = [

  body("username")
    .notEmpty().withMessage("Username is required")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Username must contain only alphabets (no numbers or special characters)")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });
      if (user) {
        return Promise.reject("Username already registered");
      }
    }),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject("Email already registered");
      }
    }),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/)
    .withMessage(
      "Password must contain alphabets, numbers and at least one special character"
    ),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Phone number must be a valid Indian number (10 digits)")
    .custom((value) => {
      if (!/^\d+$/.test(value)) {
        throw new Error("Phone number must contain only numbers");
      }
      return true;
    }),

  body("dateofbirth")
    .optional()
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage("Date of birth must be in YYYY/MM/DD format"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other")
];



exports.loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
];



exports.updateUserValidation = [

  body("username")
    .optional()
    .matches(/^[A-Za-z]+$/)
    .withMessage("Username must contain only alphabets")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { username: value } });
      if (user && user.user_id !== req.user.user_id) {
        return Promise.reject("Username already registered");
      }
    }),

  body("email")
    .optional()
    .isEmail().withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user && user.user_id !== req.user.user_id) {
        return Promise.reject("Email already registered");
      }
    }),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/)
    .withMessage(
      "Password must contain alphabets, numbers and at least one special character"
    ),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Phone number must be a valid Indian number (10 digits)"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female or other")
];
