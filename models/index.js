
//  get all the models
const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');


// create associations
// User (coach) and Team association
User.hasMany(Team, {
   foreignKey:'user_id'
});

Team.belongsTo(User, {
   foreignKey:'user_id'
});

// create association between teams and players
Team.hasMany(Players, {
   foreignKey:'team_id'
});

Player.belongsTo(Team, {
   foreginKey:'team_id'
});

module.exports = {User, Team, Player}