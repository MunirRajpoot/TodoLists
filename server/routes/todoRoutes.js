const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Get all todos for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new todo
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;

    const newTodo = new Todo({
      text,
      user: req.user.id,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update todo (toggle complete status)
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Check user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? Date.now() : null;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Check user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await todo.remove();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;