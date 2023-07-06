const sequelize = require('../../config/sequelize');
const { DataTypes, Op } = require('sequelize')

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