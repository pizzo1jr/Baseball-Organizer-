const sequelize = require('./config/connection'); // get the connection for database
const express = require('express'); // import express library
const routes = require('./controllers');
const session = require('express-session') // import express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store); //import classes to store user sessions.

// make an instance of the session storage
const sess = {
  secret: 'Super secret secret',
  cookies: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


const app = express(); // set app as an instance of express
const PORT = process.env.PORT | 3001 // use environment port use port 3001 in local environment

// middlewears for converting JSON to other data format
app.use(express.json()); // convert incoming req from JSON to javascript objects
app.use(express.urlencoded({extended: true}));// parse object
app.use(session(sess)); // turn on the session
app.use(routes); // turn on all routes


// sync the tables in the database with the modles and start the server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`
   listening on PORT ${PORT}`))
});

