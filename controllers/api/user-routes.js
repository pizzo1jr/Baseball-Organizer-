const router = require('express').Router();
const {User} = require('../../models');

// get all the users
router.get('/', (req, res) => {
   User.findAll({
      attributes: {exclude:['password']},
   })
   .then(dbUserData => {
      res.json(dbUserData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// get one user using id
router.get('/:id', (req, res) => {
   User.findOne({
      where: {
         id:req.params.id
      },
      attributes: {exclude:['password']}
   })
   .then(dbUserData => {
      if(!dbUserData){
         res.status(400).json({message: 'no user with this id was found'});
         return;
      }
      res.json(dbUserData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// post request for creating Users
router.post('/', (req, res) => {
   User.create(req.body)
   .then(dbUserData => {
      res.json(dbUserData)
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err)
   });
});

module.exports = router;