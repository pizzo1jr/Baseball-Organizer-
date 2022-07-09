const {Model, DataTypes} = require('sequelize'); // import model and datatypes class from sequelize
const sequelize = require('../config/connection'); // get the connection to databse (needed for models)
const bcrypt = require('bcrypt');

// create the User Model
class User extends Model{
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    } 
};

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
      username:{
         type: DataTypes.STRING,
         allowNull: false,
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
      },
      auth_code:{
         type:DataTypes.STRING,
         allowNull: false,
         defaultValue: ""
      }
   },
   {
      hooks:{
         async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         },
         async beforeUpdate(newUserData){
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         }
      },
      sequelize,
      freezeTableName: true,
      modelName: 'user',
      timestamps: false,
      underscored: true
   }
);

module.exports = User;