const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

router.post('/complete-module', auth, async (req, res) => {
  const { moduleId } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const existingProgress = user.progress.find(p => p.moduleId === moduleId);

    if (existingProgress) {
      existingProgress.completed = true;
    } else {
      user.progress.push({ moduleId, completed: true });
    }

    await user.save();
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('erver errorS');
  }
});

module.exports = router;
