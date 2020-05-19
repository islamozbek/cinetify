const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  active: Boolean,
});

module.exports = mongoose.model('User', userSchema);