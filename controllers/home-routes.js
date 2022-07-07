const router = require('express').Router();
const {User} = require('../models');

// render the homepage
router.get('/', (req, res) => {
   res.render('homepage');
});

// render the log in page
router.get('/user/login', (req, res)=>{
   res.render('login');
});

// render the signup page
router.get('/user/signup', (req, res)=>{
   res.render('signup');
});

module.exports = router;

