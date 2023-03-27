'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otps', {
      id: {  
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customer_id: { 
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      otp: { 
        type: Sequelize.STRING,
      },
      createdAt: { //createdAt
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: { //updatedAt
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otps');
  }
};