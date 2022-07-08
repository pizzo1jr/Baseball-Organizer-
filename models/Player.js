const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Player extends Model{}

Player.init(
   {
      id:{
         type: DataTypes.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING,
         allowNullL: false
      },
      team_id: {
         type:DataTypes.INTEGER,
         allowNull: true,
         references: {
            model:'team',
            key:'id'
         }
      },
      user_id:{
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model:'user',
            key:'id'
         }
      },
      bats: {
         type: DataTypes.STRING,
         allowNullL: false,
         defaultValue: "right"
      },
      throws: {
         type: DataTypes.STRING,
         allowNullL: false,
         defaultValue:"right"
      },
      strike_outs: { // strike default value is set to zero or it will be null. The user can leave it blank if they player did not pitch.
         type: DataTypes.STRING,
         defaultValue: 0
      },
      batters_walked: {
         type: DataTypes.INTEGER,
         defaultValue: 0
      },
      earned_run_average: {
         type: DataTypes.STRING,
         defaultValue:0
      },
      innings_pitched: {
         type: DataTypes.STRING,
         defaultValue:0
      },
      at_bats: {
         type: DataTypes.STRING,
         defaultValue:0
      },
      hits: {
         type: DataTypes.STRING,
         defaultValue:0
      },
      batting_average: {
         type: DataTypes.STRING,
         defaultValue:0
      },
      runs_batted_in: {
         type: DataTypes.STRING,
         defaultValue:0
      }
   },
   {
      sequelize,
      freezeTableName: true,
      timestamps: false,
      modelName: 'player',
      underscored: true
   }
);

module.exports = Player;