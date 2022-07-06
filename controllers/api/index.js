const router = require('express').Router();

// get all the API routes
const userRoutes = require('./user-routes');

// mount all the api route appropriately (e.g: mount user routes to '/user')
router.use('/users', userRoutes);

module.exports = router;