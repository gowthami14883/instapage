const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createPostValidation } = require("../validations/post.validation");
const postController = require("../controllers/post.controller");

router.post("/", auth, createPostValidation, validate, postController.createPost);
router.get("/me", auth, postController.getMyPosts);

module.exports = router;
