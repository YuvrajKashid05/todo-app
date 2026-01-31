import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Todo from "../models/todo.model.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  const { title, completed, priority, duedate } = req.body || {};

  if (!title?.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const todo = await Todo.create({
      title: title.trim(),
      completed: completed ?? false,
      priority: priority ?? "Medium",
      duedate: duedate ?? null,
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const { title, completed, priority, duedate } = req.body || {};

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (duedate !== undefined) todo.duedate = duedate;

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
