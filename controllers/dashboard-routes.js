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
      res.render('dashboard', {user});
   })
});

router.get('/create-team', (req, res) => {
   res.render('create-team');
   
})

module.exports = router;