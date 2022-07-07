
//  get all the models
const User = require('./User');
const Team = require('./Team');


// create associations
// User (coach) and Team association
User.hasMany(Team, {
   foreignKey:'user_id'
});

Team.belongsTo(User, {
   foreignKey:'user_id'
});

module.exports = {User, Team}