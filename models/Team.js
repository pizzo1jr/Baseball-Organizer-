const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


// create the Team model
class Team extends Model{}

Team.init(
   {
      id:{
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement: true
      },
      team_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
            len:[4]
         }
      },
      user_id:{
         references: {
            model:'user',
            key:'id'
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      modelName: 'team',
      underscored: true,
   }
);

module.exports = Team;