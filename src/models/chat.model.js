const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Chat = sequelize.define("Chat", {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "chats",
  timestamps: true
});

module.exports = Chat;
