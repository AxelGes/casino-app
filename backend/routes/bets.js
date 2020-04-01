const router = require('express').Router();
let Bet = require('../models/bet.model');

// GET all bets
router.route('/').get((req, res) => {
  Bet.find()
    .then(bets => res.json(bets))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET bet by id
router.route('/:id').get((req, res) => {
  Bet.findOne({id: req.params.id})
  .then(bet => res.json(bet))
  .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new bet
router.route('/add').post((req, res) => {
  const player_id = req.body.player_id;
  const amount = req.body.amount;
  const color = req.body.color;
  const round_id = req.body.round_id;

  const newBet = new Bet({player_id, amount, color, round_id});

  newBet.save()
    .then(res.json({status: 'Bet Saved'})
    .catch(err => res.status(400).json('Error: ' + err)));
});

module.exports = router;