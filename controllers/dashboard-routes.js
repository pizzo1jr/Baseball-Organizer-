const router = require('express').Router();
const {User, Player, Team} = require('../models');

router.get('/', (req, res) => {
   User.findOne({
      where:{
         id:req.session.user_id
      },
      include:[
         {
            model:Team,
            attributes:['team_name']
         },
         {
            model:Player,
            attributes:['player_name','position','bats','throws']
         }         
      ]
   })
   .then(dbUserData => {
      const user = dbUserData.get({plain: true});
      res.render('dashboard', {user, loggedIn: req.session.loggedIn});
   })
});

router.get('/create-team', (req, res) => {
   Player.findAll({
      where:{
         user_id:req.session.user_id
      },
      attributes: ['id','player_name','position','bats','throws']
   })
   .then(dbUserData => {
      const players = dbUserData.map(player => player.get({plain:true}));
      res.render('create-team', {players, loggedIn:req.session.loggedIn});
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

module.exports = router;