const sequelize = require('./config/connection'); // get the connection for database
const express = require('express'); // import express library




const app = express(); // set app as an instance of express
const PORT = process.env.PORT | 3001 // use environment port use port 3001 in local environment

// sync the tables in the database with the modles and start the server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`
   listening on PORT ${PORT}`))
});

