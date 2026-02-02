const express = require("express");
const cors = require("cors");

const app = express();

// CORS (add HERE)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/followers", require("./routes/follower.routes"));
app.use("/api/likes", require("./routes/like.routes"));
app.use("/api/comments", require("./routes/comment.routes"));
app.use("/api/chats", require("./routes/chat.routes"));

app.use("/uploads", express.static("uploads"));

module.exports = app;
