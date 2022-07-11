const router = require('express').Router();
const {User} = require('../../models');
const sendingMail = require('../../utils/nodemailer');
const generateAuthCode = require('../../utils/generateAuthCode');

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
      req.session.save(() => {
         req.session.user_id = dbUserData.id;
         req.session.username = dbUserData.username;
         req.session.loggedIn = true;

         res.json(dbUserData);
      })
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

      req.session.save(()=>{
         req.session.user_id = dbUserData.id;
         req.session.username = dbUserData.username;
         req.session.loggedIn = true;

         res.json({ user: dbUserData, message: 'You are now logged in!' });
      })
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// logout users (destroy session)
router.post('/logout', (req, res) => {
   if (req.session.loggedIn){
      req.session.destroy(() => {
         res.status(204).end();
      });
      res.json({message: 'User logged out!'});
   } else {
      res.status(404).end();
   }
});


// forgot password step 1: send auth_code with email to the user
router.post('/forgot-password' ,(req, res) => {
   const generated_auth_code = generateAuthCode();
   User.update(
      {
         auth_code: generated_auth_code
      },
      {
         where:{
            email: req.body.email
         }
      }
   )
   .then(dbUserData => {
      if(!dbUserData){
         res.status(400).json({message: "This email was not found in our database"});
         return;
      }
      req.session.forgotPassword = true;
      sendingMail(req.body.email, generated_auth_code);
      res.status(200).json({message:"email was sent"});
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// password reset 2nd route
router.post('/update-password', (req, res) => {
   User.update({password:req.body.password, auth_code:""}, {
      where:{
         auth_code: req.body.auth_code
      },
      individualHooks: true
   })
   .then(dbUserData => {
      if(!dbUserData){
         res.status(400).json({message: "Invalid Authentication Code"});
         return;
      }
      res.status(200).json(dbUserData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});


module.exports = router;