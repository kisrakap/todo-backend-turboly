require("dotenv").config();
require("pg");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const User = require("./models/User");
const Task = require("./models/Task");
const authRoutes = require("./routes/authRoutes");
const TaskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", TaskRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} yeeee≈`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
