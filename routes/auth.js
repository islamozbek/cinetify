const express = require('express');
const router = express.Router();
const User = require('../models/user');
const util = require('../lib/util');
const bcrypt = require('bcrypt');

/** register */
router.post('/register', async (req, res) => {
  const { password, name, email } = req.body;

  if (!password || !name || !email) {
    return res.status(400).json({ message: 'Required fields' });
  }

  const userData = await User.findOne({ email: email });
  if (userData) {
    return res.status(400).json({ message: `${email} has already exist` });
  }
  const hashPassword = await util.hashingPass(password);
  const user = {
    password: hashPassword,
    name: name,
    email: email,
    active: true,
  };
  const addUser = new User(user);
  addUser.save((err) => {
    if (!err) {
      res.status(200).json({
        message: 'Success',
        user,
      })
    }
    res.status(400).json({
      message: 'Bad Request',
    })
  })
});

// login
router.post('/login', async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'There is no user' });
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: 'Incorrect Password' });
  }

  res.status(200).json({
    message: 'Success',
    user,
  });

});

module.exports = router;
