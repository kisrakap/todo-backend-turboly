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

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:8000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
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
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = app;
