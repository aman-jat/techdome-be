const { Op } = require('sequelize');

const db = require('../lib/db');

const {
  INTEREST_RATE,
  LOAN_STATUS,
  ROLE,
  RES_MESSAGE,
} = require('../lib/constants');

const create = async (req, res) => {
  try {
    const { amount, tenure } = req.body;

    const loan = await db.loan.create({
      principalAmount: amount,
      tenure,
      interestRate: INTEREST_RATE,
      status: LOAN_STATUS.PENDING,
      repayments: [],
      borrower_id: req.auth.user.id,
      lender_id: null,
    });
    res.status(201).json(loan);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: 'Invalid payload',
      error: error?.errors?.map(err => err.message).join(', '),
    });
  }
};

const getAll = async (req, res) => {
  try {
    const isLender = req.auth.user.role === ROLE.LENDER;

    let where = {};

    if (isLender) {
      where = {
        [Op.or]: [{ lender_id: null }, { lender_id: req.auth.user.id }],
      };
    } else {
      where = { borrower_id: req.auth.user.id };
    }

    const loans = await db.loan.findAll({ where });

    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: 'Invalid payload',
      error: error?.errors?.map(err => err.message).join(', '),
    });
  }
};

const getOne = async (req, res) => {
  try {
    res.status(200).json(req.loan);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: RES_MESSAGE.INTERNAL_ERROR,
    });
  }
};

const approve = async (req, res) => {
  try {
    const { principalAmount, tenure } = req.loan;
    const simpleInterest = parseFloat(
      ((principalAmount * INTEREST_RATE * tenure * 7) / 36500).toFixed(2)
    );
    const totalPayableAmount = principalAmount + simpleInterest;

    const repayments = [];
    let emiAmount = parseFloat((totalPayableAmount / tenure).toFixed(2));

    const remainingAmount = parseFloat(
      (totalPayableAmount - emiAmount * tenure).toFixed(2)
    );
    for (let i = 0; i < tenure; i++) {
      if (i === tenure - 1) {
        emiAmount += remainingAmount;
      }
      repayments.push({
        id: i + 1,
        repayAmount: emiAmount,
        status: LOAN_STATUS.PENDING,
        due_date: new Date(
          new Date().setDate(new Date().getDate() + 7 * (i + 1))
        ),
        paid_on: null,
      });
    }
    req.loan.incurredInterest = simpleInterest;
    req.loan.totalPayableAmount = totalPayableAmount;
    req.loan.status = LOAN_STATUS.APPROVED;
    req.loan.lender_id = req.auth.user.id;
    req.loan.repayments = repayments;
    req.loan.interestRate = INTEREST_RATE;

    await req.loan.save();
    res.status(200).json(req.loan);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: RES_MESSAGE.INTERNAL_ERROR,
      error: error?.errors?.map(err => err.message).join(', '),
    });
  }
};

module.exports = { create, getAll, getOne, approve };
