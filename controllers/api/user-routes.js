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

// put request for updating Users
router.put('/:id', (req, res) => {
   User.update(req.body, {
      where:{
         id: req.params.id
      },
      individualHooks: true,
   })
   .then(dbUserData => {
      if(!dbUserData){
         res.json.status(400).json({message: 'no user with this id was found'});
         return;
      }
      res.json(dbUserData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// Routes to login the user into the site
router.post('/login', (req, res) => {
   User.findOne({
      where:{
         email:req.body.email
      }
   })
   .then(dbUserData => {
      if(!dbUserData){
         res.status(400).json({message: 'Email does not match'});
         return;
      }

      const response = dbUserData.checkPassword(req.body.password);
      if (!response){
         res.status(400).json({message: 'Password does not match'});
         return;
      }

      res.json({message: `${dbUserData.first_name} have logged in!`});
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

module.exports = router;