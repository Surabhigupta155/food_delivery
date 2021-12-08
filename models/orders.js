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
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Orders',
    modelName: 'Orders',
  });
  return Orders;
};