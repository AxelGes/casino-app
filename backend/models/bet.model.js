const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const betSchema = new Schema({
  player_id: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
  },
  color: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
  },
  round_id: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
}, {
  timestamps: true,
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;