const router = require('express').Router();
const {User, Team} = require('../../models');

// get all teams and their users (coach)
router.get('/', (req, res) => {
   Team.findAll({
      attributes:['id','team_name','user_id','created_at'],
      include:{
         model:User,
         attributes:['username']
      }
   })
   .then(dbTeamData => {
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// create a team
router.post('/', (req, res) => {
   Team.create(req.body)
   .then(dbTeamData => {
      res.status(200).json(dbTeamData);
   })
   .catch(err => {
      console.log(err);
      res.json(err);
   });
});

module.exports = router;