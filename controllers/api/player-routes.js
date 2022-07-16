const router = require('express').Router();
const {User, Team, Player} = require('../../models');
const withAuth = require('../../utils/withAuth');

router.put('/live_edit/:id?', withAuth ,(req, res)=>{
   Player.update(req.query, {
      where:{
         id:req.params.id
      }
   })
   .then(dbPlayerData => res.json(dbPlayerData));
});

// filtering player by batting stats for battin roster page
router.post('/batting-roster/?', (req, res) => {
   Player.findAll({
      attributes:['player_name', 'position','at_bats','batting_average','hits'],
      order:[
         [Object.values(req.query)[0], 'DESC']
      ]
   })
   .then(dbPlayerData => {
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   })
})

router.get('/', withAuth, (req, res) => {
   Player.findAll({
      include:[
         {
            model: User,
            attributes:['username']
         },
         {
            model: Team,
            attributes:['id','team_name']
         }
      ]
   })
   .then(dbPlayerData => res.json(dbPlayerData))
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});


// get one player based on id
router.get('/:id', withAuth, (req, res) => {
   Player.findOne({
      where:{
         id: req.params.id
      },
      include:[
         {
            model: User,
            attributes:['username']
         },
         {
            model: Team,
            attributes:['id','team_name']
         }
      ]
   })
   .then(dbPlayerData => {
      if(!dbPlayerData){
         res.status(400).json({message:"No Player with this id was found"});
         return;
      }
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// create a player
router.post('/', withAuth ,(req, res) => {
   req.body.user_id = req.session.user_id;
   Player.create(req.body)
   .then(dbPlayerData => {
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});


// edit a player information
router.put('/:id', withAuth, (req, res) => {
   req.body.user_id = req.session.user_id;
   Player.update(req.body,{
      where:{
         id:req.params.id
      }
   })
   .then(dbPlayerData => {
      if(!dbPlayerData){
         res.status(400).json({message: 'No Player with this id was found'});
         return;
      }
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// delete a player
router.delete('/:id', withAuth, (req, res) => {
   Player.destroy({
      where:{
         id:req.params.id
      }
   })
   .then(dbPlayerData => {
      if(!dbPlayerData){
         res.status(400).json({message: 'No Player with this id was found'});
         return;
      }
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});


module.exports = router;