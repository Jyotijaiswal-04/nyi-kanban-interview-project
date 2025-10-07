import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user.id });
  res.json(task);
};

export const getTasks = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { createdBy: req.user.id };

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .populate("createdBy", "username");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    task.createdBy.toString() !== req.user.id.toString() &&
    req.user.role !== "admin"
  )
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (
    task.createdBy.toString() !== req.user.id.toString() &&
    req.user.role !== "admin"
  )
    return res.status(403).json({ message: "Not authorized" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
