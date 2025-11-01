const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const quizzes = require('../data/quizzes'); // Import quiz data

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
    res.status(500).send('Server error');
  }
});

// @route   POST api/progress/submit-quiz
// @desc    Submit quiz answers and save score
// @access  Private
router.post('/submit-quiz', auth, async (req, res) => {
  const { moduleId, answers } = req.body;
  const quiz = quizzes[moduleId];

  if (!quiz) {
    return res.status(404).json({ msg: 'Quiz not found for this module' });
  }

  if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({ msg: 'Invalid answers format' });
  }

  try {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const percentageScore = Math.round((score / quiz.questions.length) * 100);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const progressIndex = user.progress.findIndex(p => p.moduleId === moduleId);

    if (progressIndex > -1) {
      user.progress[progressIndex].quizScore = percentageScore;
      // Mark module as completed if they took the quiz
      user.progress[progressIndex].completed = true; 
    } else {
      user.progress.push({ moduleId, completed: true, quizScore: percentageScore });
    }

    await user.save();

    res.json({
      score: percentageScore,
      progress: user.progress
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
