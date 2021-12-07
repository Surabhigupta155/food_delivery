'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      time_date: {
        type: DataTypes.STRING
      },
      review: {
        type: DataTypes.STRING
      },
      c_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      p_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Products', key: 'id' }
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
    await queryInterface.dropTable('Reviews');
  }
};