'use strict';
const { ROLE } = require('../src/lib/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        defaultValue: ROLE.BORROWER,
        type: Sequelize.ENUM(ROLE.LENDER, ROLE.BORROWER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Members');
  },
};
