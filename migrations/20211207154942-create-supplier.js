'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('supplier', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Supplier must have a name' },
          notEmpty: { msg: 'Name must not be empty' }
        }
      },
      address: {
        type: DataTypes.STRING
      },
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
      rating: {
        type: DataTypes.INTEGER
      },
      working_hours: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('supplier');
  }
};