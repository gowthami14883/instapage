const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING
  },

  bio: {
    type: DataTypes.STRING
  },

  profilepic: {
    type: DataTypes.STRING
  },

  dateofbirth: {
    type: DataTypes.DATE
  },

  gender: {
    type: DataTypes.ENUM("male", "female", "other")
  }
}, {
  tableName: "users",
  timestamps: true
});

module.exports = User;
