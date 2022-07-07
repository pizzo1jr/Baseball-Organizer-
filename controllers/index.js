const router = require('express').Router();


// get all the routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');


// mount the routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;