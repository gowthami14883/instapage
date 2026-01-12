const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const postController = require("../controllers/post.controller");
const { createPostValidation,updatePostValidation } = require("../validations/post.validation");
const upload = require("../middlewares/upload.middleware");

router.post( "/", auth, upload.single("media"), createPostValidation, validate, postController.createPost);
router.get("/me", auth, postController.getMyPosts);
router.get("/", auth, postController.getAllPosts);  // get all
router.put( "/:postId",auth,updatePostValidation,validate,postController.updatePost);
router.delete("/:postId", auth, postController.deletePost);
module.exports = router;
