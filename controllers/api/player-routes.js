const router = require('express').Router();
const {User, Team, Player} = require('../../models');


router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
   Player.destroy(req.body,{
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