const router = require('express').Router();
let Round = require('../models/round.model');
let results = "123456" 

// GET current round
router.route('/current/').get((req, res) => {
  Round.findOne({status: 1})
    .then(round => res.json(round))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD new round and update last round Status
router.route('/new/').post((req, res) => {
  Round.findOne({status: 1})//busco la ronda anterior
  .then((lastRound) =>{
    //update ronda anterior
    let lastRoundModified = lastRound;
    lastRoundModified.status = 0;

    lastRoundModified.save()
      .then(() => console.log('Last round state updated!'))
      .catch(err => console.log('Error: ' + err));

    //creo ronda nueva
    const date_played = parseInt(lastRound.date_played) + 20;
    const result = results[0];
    results = results.slice(1, results.size);
    const hash = "fakeHash" + result;
    const status = 1;

    const newRound = new Round({date_played, result, hash, status});

    newRound.save()
      .then(res.json({status: 'New round Saved!'}))
      .catch(err => console.log('Error: ' + err))
  })
  .catch(err => console.log('Error: ' + err));
});

// GET all rounds
router.route('/').get((req, res) => {
  Round.find({status: 0})
    .then(rounds => res.json(rounds))
    .catch(err => res.status(400).json('Error: ' + err));
});


/* ADD a new round
router.route('/new').post((req, res) => {

  Round.findOne({status: 1})
  .then((lastRound) =>{
    const date_played = parseInt(lastRound.date_played) + 20;
    const result = results[0];
    results = results.slice(1, results.size);
    const hash = "fakeHash" + result;
    const status = 0;

    const newRound = new Round({date_played, result, hash, status});

    newRound.save()
      .then(res.json({status: 'Round Saved'})
      .catch(err => res.status(400).json('Error: ' + err)));
  })
  .catch(err => res.status(400).json('Error: ' + err))
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
});*/

module.exports = router;