const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Todo text is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;