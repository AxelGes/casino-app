const router = require('express').Router();
let User = require('../models/user.model');

// GET all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET user by email
router.route('/:email').get((req, res) => {
  User.findOne({email: req.params.email})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new user
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const coins = req.body.coins;

  const newUser = new User({email, username, coins});

  newUser.save()
    .then(res.json({status: 'User Saved'})
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;