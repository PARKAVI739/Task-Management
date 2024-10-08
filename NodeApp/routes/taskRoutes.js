const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Get tasks for the authenticated user
router.get('/tasks', authenticateJWT, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.sub });
  res.json(tasks);
});

// Create new task
router.post('/tasks', authenticateJWT, async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const newTask = new Task({
    userId: req.user.sub,
    title,
    description,
    priority,
    deadline
  });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put('/tasks/:id', authenticateJWT, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete task
router.delete('/tasks/:id', authenticateJWT, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
