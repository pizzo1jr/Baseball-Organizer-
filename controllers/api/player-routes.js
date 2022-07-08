const router = require('express').Router();
const {User, Team, Player} = require('../../models');


router.post('/', (req, res) => {
   Player.create(req.body)
   .then(dbPlayerData => {
      res.status(200).json(dbPlayerData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
})


module.exports = router;