const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const path = require('path');
const multer = require('multer');

// --- Multer Configuration for Avatar Uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB file size limit
  },
  fileFilter: fileFilter
});
// ------------------------------------------------

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ msg: 'User with this email already exists' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

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

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/auth/me/avatar
// @desc    Update user avatar
// @access  Private
router.put('/me/avatar', auth, async (req, res) => {
  // Allow avatar to be a string or null, but the field must be present
  if (req.body.avatar === undefined) {
    return res.status(400).json({ msg: 'Avatar field is required' });
  }
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar: avatar } },
      { new: true } // Return the updated document
    ).select('-password'); // Exclude password from the result

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/me/avatar/upload
// @desc    Upload a custom user avatar
// @access  Private
router.post('/me/avatar/upload', auth, upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'Please upload a file.' });
  }

  try {
    // The file path that will be saved to the DB
    const avatarPath = path.join('avatars', req.file.filename).replace(/\\/g, '/');

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar: avatarPath } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}, (error, req, res, next) => {
  // Custom error handler for multer
  res.status(400).json({ msg: error.message });
});

module.exports = router;
