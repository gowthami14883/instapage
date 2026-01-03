const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { commentValidation } = require("../validations/comment.validation");
const commentController = require("../controllers/comment.controller");

router.post("/:postId", auth, commentValidation, validate, commentController.addComment);

module.exports = router;
