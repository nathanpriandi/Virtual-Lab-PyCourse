const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const quizzes = require('../data/quizzes');

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
    const detailedResults = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      detailedResults.push({ questionIndex: index, correct: isCorrect });
      if (isCorrect) {
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
      const existingScore = user.progress[progressIndex].quizScore || 0;
      if (percentageScore > existingScore) {
        user.progress[progressIndex].quizScore = percentageScore;
      }
      if (user.progress[progressIndex].quizScore === 100) {
        user.progress[progressIndex].completed = true;
      }
    } else {
      user.progress.push({ 
        moduleId, 
        completed: percentageScore === 100,
        quizScore: percentageScore 
      });
    }

    await user.save();

    res.json({
      score: percentageScore,
      detailedResults: detailedResults,
      progress: user.progress
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

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
