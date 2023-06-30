const sequelize = require('../../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Op = Sequelize;

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  images_url: {
    type: DataTypes.TEXT
  }
});

module.exports = {
  Product,
  Op
}