// const sequelize = require("../config/database");
// const User = require("./user.model");
// const db = {};
// db.sequelize = sequelize;
// db.User = User;

// module.exports = db;

const sequelize = require("../config/database");

const User = require("./user.model");
const Post = require("./post.model");
const Comment = require("./comment.model");
const Like = require("./like.model");
const Follower = require("./follower.model");
const Chat = require("./chat.model");


User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
Post.belongsTo(User, {
  foreignKey: "user_id"
});


User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
Comment.belongsTo(User, {
  foreignKey: "user_id"
});


Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});
Comment.belongsTo(Post, {
  foreignKey: "post_id"
});


User.hasMany(Like, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
Like.belongsTo(User, {
  foreignKey: "user_id"
});


Post.hasMany(Like, {
  foreignKey: "post_id",
  onDelete: "CASCADE"
});
Like.belongsTo(Post, {
  foreignKey: "post_id"
});


User.hasMany(Follower, {
  foreignKey: "follower_user_id",
  as: "Following",
  onDelete: "CASCADE"
});

User.hasMany(Follower, {
  foreignKey: "following_user_id",
  as: "Followers",
  onDelete: "CASCADE"
});

Follower.belongsTo(User, {
  foreignKey: "follower_user_id",
  as: "FollowerUser"
});

Follower.belongsTo(User, {
  foreignKey: "following_user_id",
  as: "FollowingUser"
});


User.hasMany(Chat, {
  foreignKey: "sender_id",
  as: "SentMessages",
  onDelete: "CASCADE"
});

User.hasMany(Chat, {
  foreignKey: "receiver_id",
  as: "ReceivedMessages",
  onDelete: "CASCADE"
});

Chat.belongsTo(User, {
  foreignKey: "sender_id",
  as: "Sender"
});

Chat.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "Receiver"
});


const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Like = Like;
db.Follower = Follower;
db.Chat = Chat;

module.exports = db;

