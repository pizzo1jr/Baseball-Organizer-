const router = require('express').Router();
const {User, Player, Team} = require('../models');

router.get('/', (req, res) => {
   res.render('dashboard');
})

module.exports = router;