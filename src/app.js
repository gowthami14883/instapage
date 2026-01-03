const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/followers", require("./routes/follower.routes"));
app.use("/api/likes", require("./routes/like.routes"));
app.use("/api/comments", require("./routes/comment.routes"));
app.use("/api/chats", require("./routes/chat.routes"));


module.exports = app;
