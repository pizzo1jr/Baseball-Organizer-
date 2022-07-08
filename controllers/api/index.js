const router = require('express').Router();

// get all the API routes
const userRoutes = require('./user-routes');
const teamRoutes = require('./team-routes');
const playerRoutes = require('./player-routes');

// mount all the api route appropriately (e.g: mount user routes to '/user')
router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

module.exports = router;