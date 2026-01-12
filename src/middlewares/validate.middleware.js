const { validationResult } = require("express-validator");
const apiResponse = require("../utils/apiResponse");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return apiResponse.validationErrorResponse(
      res,
      "Validation failed",
      errors.array()
    );
  }

  next();
};
