const router = require('express').Router();
const {User, Player, Team} = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', withAuth ,(req, res) => {
   User.findOne({
      where:{
         id:req.session.user_id
      },
      include:[
         {
            model:Team,
            attributes:['team_name','id']
         },
         {
            model:Player,
            attributes:['id','player_name','position','bats','throws']
         }         
      ]
   })
   .then(dbUserData => {
      const user = dbUserData.get({plain: true});
      res.render('dashboard', {user, loggedIn: req.session.loggedIn});
   })
});

router.get('/create-team', (req, res) => {
   
   res.render('create-team', {loggedIn: req.session.loggedIn});
   
});

router.get('/add-team/:id', (req, res) => {
   Player.findAll({
      where:{
         user_id:req.session.user_id,
         team_id:null
      },
      attributes: ['id','player_name','position','bats','throws']
   })
   .then(dbUserData => {
      const players = dbUserData.map(player => player.get({plain:true}));
      res.render('add-team', {players, loggedIn:req.session.loggedIn});
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

router.get('/edit-team/:id', (req, res) => {
   Team.findOne({
      where:{
         id:req.params.id
      },
      include:{
         model:Player,
         attributes:['id','player_name','position','bats','throws']
      }
   })
   .then(dbTeamData => {
      const team = dbTeamData.get({plain:true});
      res.render('edit-team', {team, loggedIn: req.session.loggedIn});
   })
   .catch(err => {
      console.log(err);
      res.json(err);
   })
});

// single player status page

router.get('/single-player/:id', (req, res) => {
   Player.findOne({
      where:{
         id:req.params.id
      },
      include: [
         {
            model:Team,
            attributes:['id', 'team_name']
         },
         {
            model:User,
            attributes:['id', 'first_name']
         }
      ]
   })
   .then(dbPlayerData => {
      const player = dbPlayerData.get({plain:true});
      res.render('singlePlayer', {player, loggedIn: req.session.loggedIn});
   })
});

// creating a new player route
router.get('/create-player', (req, res) => {
   res.render('createPlayer', {loggedIn: req.session.loggedIn});
});

// editing player page get route
router.get('/edit-player/:id', (req, res) => {
   Player.findOne({
      where:{
         id:req.params.id
      }
   })
   .then(dbPlayerData => {
      const player = dbPlayerData.get({plain:true});
      res.render('edit-player', {player, loggedIn:req.session.loggedIn});
   })
})

module.exports = router;