const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const followerController = require("../controllers/follower.controller");

router.post("/:userId", auth, followerController.followUser);
router.delete("/:userId", auth, followerController.unfollowUser);
router.get("/:userId/followers", auth, followerController.getFollowers);
router.get("/:userId/following", auth, followerController.getFollowing);



module.exports = router;
