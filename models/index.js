
//  get all the models
const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');


// create associations
// User (coach) and Team association
User.hasMany(Team, {
   foreignKey:'user_id',
   onDelete: 'CASCADE'
});

Team.belongsTo(User, {
   foreignKey:'user_id',
   onDelete: 'CASCADE'
});

// create association between teams and players
Team.hasMany(Player, {
   foreignKey:'team_id',
   onDelete: 'SET NULL'
});

Player.belongsTo(Team, {
   foreginKey:'team_id',
   onDelete: 'SET NULL'
});

// creaet association between players and user (coach)
User.hasMany(Player, {
   foreignKey: 'user_id',
   onDelete:'CASCADE'
   
});

Player.belongsTo(User, {
   foreginKey:'user_id',
   onDelete:'CASCADE'
});

module.exports = {User, Team, Player}