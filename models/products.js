'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    s_id: {
      type: DataTypes.INTEGER,
      references: { model: 'supplier', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Products',
  });
  return Products;
};