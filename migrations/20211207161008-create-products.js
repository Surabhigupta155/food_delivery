'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      s_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Supplier', key: 'id' }
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
    await queryInterface.dropTable('Products');
  }
};