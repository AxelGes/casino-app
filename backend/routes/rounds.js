const router = require('express').Router();
let Round = require('../models/round.model');

// GET all rounds
router.route('/').get((req, res) => {
  Round.find()
    .then(rounds => res.json(rounds))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET round by id
router.route('/:id').get((req, res) => {
  Round.findOne({id: req.params.id})
  .then(round => res.json(round))
  .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new round
router.route('/add').post((req, res) => {
  const date_played = req.body.date_played;
  const result = req.body.result;
  const hash = req.body.hash;
  const status = req.body.status;

  const newRound = new Round({date_played, result, hash, status});

  newRound.save()
    .then(res.json({status: 'Round Saved'})
    .catch(err => res.status(400).json('Error: ' + err)));
});

module.exports = router;