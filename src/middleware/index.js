const { Op } = require('sequelize');

const token = require('../lib/token');
const db = require('../lib/db');
const { RES_MESSAGE, ROLE, LOAN_STATUS } = require('../lib/constants');

const checkPayload = requiredFields => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };
};

const checkAuth = async (req, res, next) => {
  try {
    const _auth = req.headers.authorization;
    const user = await db.user.findOne({
      where: { id: token.decode(_auth).id },
    });
    if (token.check(_auth, user.salt)) {
      const member = await db.member.findOne({
        where: { email: user.email },
      });
      req.auth = {
        user: member.toJSON(),
      };
    }
    next();
  } catch (e) {
    return res.status(401).send({
      message: RES_MESSAGE.UNAUTHENTICATED,
    });
  }
};

const checkLender = async (req, res, next) => {
  try {
    if (req.auth.user.role === ROLE.LENDER) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    return res.status(403).send({
      message: RES_MESSAGE.UNAUTHORIZED,
    });
  }
};

const checkBorrower = async (req, res, next) => {
  try {
    if (req.auth.user.role === ROLE.BORROWER) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    return res.status(403).send({
      message: RES_MESSAGE.UNAUTHORIZED,
    });
  }
};

const grabLoan = async (req, res, next) => {
  try {
    let where = { id: req.params.id };
    const endpoint = `${req.url}`.split('/').pop();
    if (['approve', 'reject'].includes(endpoint)) {
      where['status'] = LOAN_STATUS.PENDING;
    } else {
      if (req.auth.user.role === ROLE.BORROWER) {
        if (endpoint === 'repay') {
          where['status'] = LOAN_STATUS.APPROVED;
        }
        where['borrower_id'] = req.auth.user.id;
      } else {
        where[Op.or] = [{ lender_id: null }, { lender_id: req.auth.user.id }];
      }
    }

    loan = await db.loan.findOne({
      where,
    });
    if (!loan) {
      throw new Error();
    }

    req.loan = loan;
    next();
  } catch (e) {
    return res.status(404).send({
      message: RES_MESSAGE.NOT_FOUND,
    });
  }
};

module.exports = {
  checkAuth,
  checkLender,
  checkBorrower,
  grabLoan,
  checkPayload,
};
