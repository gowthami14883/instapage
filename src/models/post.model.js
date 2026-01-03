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
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "posts",
  timestamps: true
});

module.exports = Post;
