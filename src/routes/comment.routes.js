
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const commentController = require("../controllers/comment.controller");
const { createCommentValidation, updateCommentValidation} = require("../validations/comment.validation");

router.post( "/:postId", auth, createCommentValidation, validate, commentController.addComment);

router.get("/post/:postId",auth,commentController.getCommentsByPost);

router.put("/:commentId", auth,updateCommentValidation,validate,commentController.updateComment);

router.delete( "/:commentId", auth,commentController.deleteComment);

router.get( "/", auth, commentController.getAllComments);

module.exports = router;
