'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true
    },
    customer_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqueKey:true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    is_phone_number_verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    means_of_id: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    means_of_id_number: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    marital_status: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_disable_reason: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    createdAt: { //createdAt
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { //updatedAt
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};