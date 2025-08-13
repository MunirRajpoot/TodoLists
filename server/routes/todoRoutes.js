const express = require("express");
const { Todo } = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 📌 Get todos for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Create new todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Update todo (only if belongs to user)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Delete todo (only if belongs to user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Toggle complete (only if belongs to user)
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date() : null;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
