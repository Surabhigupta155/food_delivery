'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Supplier.init({
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Supplier must have a name' },
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    address: DataTypes.STRING,
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Supplier must have phone number' },
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
        isEmail: true
      }
    },
    rating: DataTypes.INTEGER,
    working_hours: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'supplier',
    modelName: 'Supplier',
  });
  return Supplier;
};