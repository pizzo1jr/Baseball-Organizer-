const router = require('express').Router();


// get all the routes
const apiRoutes = require('./api');


// mount the routes
router.use('/api', apiRoutes);

module.exports = router;