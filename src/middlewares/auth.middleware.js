const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return apiResponse.unauthorizedResponse(res, "Authorization header missing");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return apiResponse.unauthorizedResponse(res, "Token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return apiResponse.unauthorizedResponse(res, "Invalid or expired token");
  }
};
