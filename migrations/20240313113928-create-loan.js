'use strict';
const { LOAN_STATUS } = require('../src/lib/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lender_id: {
        allowNull: true,
        references: {
          model: 'Members',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      borrower_id: {
        required: true,
        references: {
          model: 'Members',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      principalAmount: {
        required: true,
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      incurredInterest: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      totalPayableAmount: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      tenure: {
        required: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      interestRate: {
        required: true,
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status: {
        defaultValue: LOAN_STATUS.PENDING,
        type: Sequelize.ENUM(...Object.values(LOAN_STATUS)),
      },
      repayments: {
        required: true,
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.JSONB),
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
    await queryInterface.dropTable('Loans');
  },
};
