'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,

    username: {
      type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'username may not be blank'
          }
        }
      },
    email: {
      type: DataTypes.STRING,
        validate:{
            isEmail: {
              msg: 'invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
        validate:{
          len: {
            args: [6,32],
              msg: 'password must be between 6 to 10 characters long'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password){
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  user.prototype.isValidPassword = function(passwordTyped){
    return bcrypt.compareSync(passwordTyped, this.password);

}
user.prototype.toJSON = function(){
  var user = this.get();
  delete user.password;
  return user;
}


return user;
};
