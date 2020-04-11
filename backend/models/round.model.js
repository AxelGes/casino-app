const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roundSchema = new Schema({
  date_played: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  result: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
  },
  hash: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  status: {
    type: Boolean, // 0 history round, 1 = active round
    required: true,
    unique: false,
    trim: true,
  },
}, {
  timestamps: true,
});

const Round = mongoose.model('Round', roundSchema);

module.exports = Round;