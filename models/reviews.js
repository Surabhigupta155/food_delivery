'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reviews.init({
    time_date: DataTypes.STRING,
    review: DataTypes.STRING,
    c_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    p_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Products', key: 'id' }
    }
  }, {
    sequelize,
    tableName: 'Reviews',
    modelName: 'Reviews',
  });
  return Reviews;
};