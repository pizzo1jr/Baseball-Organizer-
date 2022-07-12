const router = require('express').Router();
const {User, Team, Player} = require('../../models');

// get all teams and their users (coach)
router.get('/', (req, res) => {
   Team.findAll({
      attributes:['id','team_name','user_id','created_at'],
      include:[
         {
         model:User,
         attributes:['username']
        },
        {
         model:Player,
         attributes:['player_name', 'position', 'bats', 'throws']
        }
      ]
   })
   .then(dbTeamData => {
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// get one team and their user(coach) based on params id
router.get('/:id', (req, res) => {
   Team.findOne({
      where:{
         id:req.params.id
      },
      attributes:['id','team_name','user_id','created_at'],
      include:[
         {
         model:User,
         attributes:['username']
        },
        {
         model:Player,
         attributes:['player_name', 'position', 'bats', 'throws']
        }
      ]
   })
   .then(dbTeamData => {
      if(!dbTeamData){
         res.status(400).json({message: 'No team with this id is found'});
         return;
      }
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// update a team name (for now its just name. We can edit the player in later)
router.put('/:id', (req, res) => {
   Team.update(
      {
         team_name: req.body.team_name
      },
      {
         where:{
            id:req.params.id
         },
      }
   )
   .then(dbTeamData => {
      if(!dbTeamData){
         res.status(400).json({message: "No team with this id was found"});
         return;
      }
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// create a team
router.post('/', (req, res) => {
   Team.create({
      team_name: req.body.team_name,
      user_id: req.session.user_id // will update to req.session.id
   })
   .then(dbTeamData => {
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.json(err);
   });
});

// DELETE a team 
router.delete('/:id', (req, res) => {
   Team.destroy({
      where:{
         id: req.params.id
      }
   })
   .then(dbTeamData => {
      if(!dbTeamData){
         res.status(400).json({message: 'No team with this id was found'});
         return;
      }
      res.json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
})

module.exports = router;