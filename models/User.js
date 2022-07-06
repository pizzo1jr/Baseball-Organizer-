const {Model, DataTypes} = require('sequelize'); // import model and datatypes class from sequelize
const sequelize = require('../config/connection'); // get the connection to databse (needed for models)

// create the User Model
class User extends Model{};

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      first_name: {
         type:DataTypes.STRING,
         allowNull: false
      },
      last_name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: true
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len:[4]
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      modelName: 'user',
      timestamps: false,
      underscored: true
   }
);

module.exports = User;