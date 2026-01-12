
const app = require("./src/app");
const db = require("./src/models");
require("dotenv").config();

db.sequelize
  .sync() 
  .then(() => {
    console.log("Database connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB error:", err);
  });
