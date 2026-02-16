const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post", {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caption: {
    type: DataTypes.STRING
  },
  media_url: {
    type: DataTypes.JSON,
    allowNull: false
  },
  user_id: {   // ✅ ADD THIS
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "posts",
  timestamps: true
});

module.exports = Post;

