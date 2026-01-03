const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const likeController = require("../controllers/like.controller");

router.post("/:postId", auth, likeController.likePost);

module.exports = router;
