const router = require('express').Router();
let Bet = require('../models/bet.model');
let User = require('../models/user.model');
let Round = require('../models/round.model');

let actualRound = new Round();
let actualRoundColor;

// Give Winnings - Update users coins
router.route('/giveWinnings').get((req, res) => {
  Round.findOne({status: 1})
  .then(round => {
    actualRound = round;
    
    if(round.result >= 1 && round.result <= 7){
      actualRoundColor = 0; // red
    }
    
    if(round.result >= 8){
      actualRoundColor = 2; // black
    }

    if(round.result == 0){
      actualRoundColor = 1; // green
    }

    Bet.find({round_id: round._id, status: 0})
    .then(bets => {
        bets.forEach(bet => {
          let modifiedBet = bet;
          if (bet.color == actualRoundColor){
            console.log(bet.color + "" + actualRoundColor)
            modifiedBet.status = 1;
  
            User.findOne({_id: bet.player_id})
            .then(user => {
              let modifiedUser = user;
    
              if(actualRoundColor == 0 || actualRoundColor == 2 ){
                modifiedUser.coins += (bet.amount * 2);
              }
    
              if(actualRoundColor == 1){
                modifiedUser.coins += (bet.amount * 13);
              }
              
              modifiedUser.save()
                .then(() => console.log('User coins updated!'))
                .catch(err => console.log('Error: ' + err));
            })
          } else {
            modifiedBet.status = 2;
          }
  
        modifiedBet.save()
        .then(() => console.log('Bet status updated!'))
        .catch(err => console.log('Error: ' + err));
        })
        
    })
    .catch(err => console.log('Error: ' + err))
    res.json('Round ' + round._id + ' winnings given!')
  })
  .catch(err => console.log('Error: ' + err))
  res.json('No active round found.')
});

// ADD new bet
router.route('/add').post((req, res) => {
  User.findOne({_id: req.body.player_id})
  .then(user =>{ // modifico coins
    if( ((user.coins - req.body.amount) >= 0) && req.body.amount > 0){
      let modifiedUser = user;
      modifiedUser.coins = modifiedUser.coins - req.body.amount;
    
      modifiedUser.save()
        .then(console.log('User Coins updated'))
        .catch(err => res.status(400).json('Error: ' + err));
      return modifiedUser;
    } else{
      res.status(400).json('Error insufficient founds ');
    }
  })
  .catch(err => res.status(400).json('Error: ' + err))
  .then(modifiedUser => { // hago bet
    if(modifiedUser.coins >= 0){
      const player_id = req.body.player_id;
      const amount = req.body.amount;
      const color = req.body.color;
      const round_id = req.body.round_id;
      const status = 0;

      const newBet = new Bet({player_id, amount, color, round_id, status});
    
      newBet.save()
        .then(res.json({status: 'Bet Saved'}))
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
      res.status(400).json('Error insufficient founds ');
    }
  });
});

// GET all bets by round
router.route('/:round_id').get((req, res) => {
  Bet.find({round_id: req.params.round_id})
    .then(bets => res.json(bets))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
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
  const status = 0;
  
  const newBet = new Bet({player_id, amount, color, round_id, status});

  newBet.save()
    .then(res.json({status: 'Bet Saved'})
    .catch(err => res.status(400).json('Error: ' + err)));
});*/

module.exports = router;