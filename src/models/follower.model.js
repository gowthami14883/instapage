const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Follower = sequelize.define("Follower", {
  follower_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  follower_user_id: DataTypes.INTEGER,
  following_user_id: DataTypes.INTEGER
}, {
  tableName: "followers",
  timestamps: true
});

module.exports = Follower;
