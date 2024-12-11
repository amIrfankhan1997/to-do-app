
const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
};

router.get('/', authenticate, async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
});

router.post('/', authenticate, async (req, res) => {
    const todo = new Todo({
        user: req.user.id,
        title: req.body.title,
    });
    await todo.save();
    res.status(201).json(todo);
});

router.put('/:id', authenticate, async (req, res) => {
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title: req.body.title, completed: req.body.completed },
        { new: true }
    );
    res.json(todo);
});

router.delete('/:id', authenticate, async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.send('Todo deleted');
});

module.exports = router;
