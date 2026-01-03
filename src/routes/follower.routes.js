const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const followerController = require("../controllers/follower.controller");

router.post("/:userId", auth, followerController.followUser);

module.exports = router;
