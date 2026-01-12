
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const likeController = require("../controllers/like.controller");

router.post("/:postId", auth, likeController.likePost);
router.delete("/:postId", auth, likeController.unlikePost);
router.get("/", auth, likeController.getAllLikes);
router.get("/post/:postId", auth, likeController.getLikesByPost);

module.exports = router;
