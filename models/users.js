'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have phone number' },
        notEmpty: { msg: 'Phone Number must not be empty' },
        isNumeric: true
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      defaultValue: null
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    dob: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'Users',
  });
  return Users;
};