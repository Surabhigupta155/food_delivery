'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      c_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      p_id: {
        type: DataTypes.INTEGER,
        references: { model: 'products', key: 'id' }
      },
      s_id: {
        type: DataTypes.INTEGER,
        references: { model: 'supplier', key: 'id' }
      },
      quantity: DataTypes.STRING,
      address: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
      time_date: DataTypes.STRING,
      status: DataTypes.STRING,
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
    await queryInterface.dropTable('orders');
  }
};