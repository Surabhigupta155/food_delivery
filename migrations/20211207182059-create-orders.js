'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ord_num: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      c_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      p_id: {
        type: DataTypes.INTEGER,
        references: { model: 'products', key: 'id' }
      },
      quantity: DataTypes.STRING,
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
    await queryInterface.dropTable('Orders');
  }
};