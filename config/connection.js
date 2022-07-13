const Sequelize = require('sequelize'); // import sequelize library
require(`dotenv`).config(); // import dotenv library for using .env file 

let sequelize;

if (process.env.JAWSDB_URL){
   sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
   // create an instance of squelize library and export it for other files
   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: "localhost",
      port: 3306,
      dialect: 'mysql'
   });
}


module.exports = sequelize;