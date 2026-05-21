const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, userId } = req.body;
    if (!title || !userId || !priority || !dueDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedPriority = priority.toString().toLowerCase();
    if (!["low", "medium", "high"].includes(normalizedPriority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: normalizedPriority,
      userId,
    });

    res.status(201).json({ task, message: "Task created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Gagal membuat task",
      error: err.message || "Failed to create task",
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId query parameter" });
    }
    const tasks = await Task.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil task",
      error: "Failed to fetch tasks",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, priority, isComplete } = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Tidak Ditemukan" });
    }
    await task.update({
      title: title || task.title,
      description: description || task.description,
      dueDate: dueDate || task.dueDate,
      priority: priority || task.priority,
      isComplete: isComplete !== undefined ? isComplete : task.isComplete,
    });

    res.status(200).json({ message: "Tugas berhasil diperbarui", task });
  } catch (err) {
    res.status(500).json({
      message: "Gagal memperbarui task",
      error: "Failed to update task",
    });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Tidak Ditemukan" });
    }
    task.isComplete = !task.isComplete;
    await task.save();
    res
      .status(200)
      .json({ task, message: "Task completion toggled successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Gagal memperbarui status task",
      error: "Failed to toggle task completion",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Tidak Ditemukan" });
    }
    await task.destroy();
    res
      .status(200)
      .json({ message: `Task ${task.title} deleted successfully` });
  } catch (err) {
    res.status(500).json({
      message: "Gagal menghapus task",
      error: "Failed to delete task",
    });
  }
};
