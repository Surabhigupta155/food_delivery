'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Orders.init({
    // customer address
    // s_id
    // total_price_of_order
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
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'orders',
  });
  return Orders;
};