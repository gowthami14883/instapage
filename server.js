const app = require("./src/app");
const db = require("./src/models");
require("dotenv").config();

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB error:", err);
  });
