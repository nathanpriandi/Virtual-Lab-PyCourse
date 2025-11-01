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

    // Only create a progress entry if it doesn't exist
    if (!existingProgress) {
      user.progress.push({ moduleId, completed: false });
      await user.save();
    }

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
      // Only mark as completed if the score is 100%
      if (percentageScore === 100) {
        user.progress[progressIndex].completed = true; 
      }
    } else {
      // This case might happen if /complete-module was never called, create progress entry
      user.progress.push({ 
        moduleId, 
        completed: percentageScore === 100, // Set completion based on score
        quizScore: percentageScore 
      });
    }

    await user.save();

    res.status(500).send('Server error');
  }
});

// @route   POST api/progress/save-code
// @desc    Save user's code for a module
// @access  Private
router.post('/save-code', auth, async (req, res) => {
  const { moduleId, code } = req.body;

  if (code === undefined || !moduleId) {
    return res.status(400).json({ msg: 'Module ID and code are required.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const progressIndex = user.progress.findIndex(p => p.moduleId === moduleId);

    if (progressIndex > -1) {
      user.progress[progressIndex].userCode = code;
    } else {
      // This case is unlikely if user visits module page first, but good to have
      user.progress.push({ moduleId, completed: false, userCode: code });
    }

    await user.save();
    res.json({ msg: 'Code saved successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
