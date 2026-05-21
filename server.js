const express = require("express");
const cors = require("cors");
const port = 3000;
const sequelize = require("./config/db");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} yeeee≈`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// // Routes
// app.get('/api/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.findAll({ include: User });
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch tasks' });
//     }
// });

// app.post('/api/tasks', async (req, res) => {
//     try {
//         const { title, description, userId } = req.body;
//         const task = await Task.create({ title, description, userId });
//         res.json(task);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create task' });
//     }
// });
