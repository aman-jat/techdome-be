const { DataTypes, Model, ValidationError } = require('sequelize');
const sequelize = require('../src/lib/sequelize');
const { LOAN_STATUS } = require('../src/lib/constants');

class Loan extends Model {}

Loan.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    lender_id: {
      allowNull: true,
      references: {
        model: 'Members',
        key: 'id',
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
    },
    borrower_id: {
      required: true,
      references: {
        model: 'Members',
        key: 'id',
      },
      onDelete: 'CASCADE',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    principalAmount: {
      required: true,
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        isPositiveNonZeroDecimal(value) {
          if (value <= 0 || isNaN(value)) {
            throw new ValidationError(
              'Loan amount must be a positive non-zero decimal number.'
            );
          }
        },
      },
    },
    tenure: {
      required: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isPositiveNonZeroInteger(value) {
          if (value <= 0 || isNaN(value)) {
            throw new ValidationError(
              'Tenure must be a non-zero positive integer.'
            );
          }
        },
      },
    },
    interestRate: {
      required: true,
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        isPositiveDecimal(value) {
          if (value < 0 || isNaN(value)) {
            throw new ValidationError(
              'Interest rate must be a positive decimal number.'
            );
          }
        },
      },
    },
    totalPayableAmount: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    incurredInterest: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    status: {
      defaultValue: LOAN_STATUS.PENDING,
      type: DataTypes.ENUM(...Object.values(LOAN_STATUS)),
    },
    repayments: {
      required: true,
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.JSONB),
      validate: {
        isRepaymentArray(value) {
          if (
            !Array.isArray(value) ||
            !value.every(obj => isRepaymentObject(obj))
          ) {
            throw new ValidationError(
              'Repayments must be an array of valid repayment objects.'
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Loan',
    underscored: false,
    tableName: 'Loans',
    hooks: {
      beforeCreate(instance) {
        if (!Array.isArray(instance.repayments)) {
          throw new Error('Repayments must be an array.');
        }
      },
    },
    scopes: {
      loan(value) {
        return { where: { id: value } };
      },
    },
  }
);

const isRepaymentObject = obj => {
  return (
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.keys(obj).every(key =>
      ['id', 'paid_on', 'due_date', 'repayAmount', 'status'].includes(key)
    ) &&
    typeof obj.id === 'number' &&
    (obj.paid_on instanceof Date || obj.paid_on == null) &&
    obj.due_date instanceof Date &&
    typeof obj.repayAmount === 'number' &&
    obj.repayAmount > 0 &&
    Object.values(LOAN_STATUS).includes(obj.status)
  );
};

module.exports = Loan;
