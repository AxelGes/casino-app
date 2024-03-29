const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  coins: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
    minlength: 0
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;