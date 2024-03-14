const SALT_ROUNDS = 10;
const INTEREST_RATE = 0;

const RES_MESSAGE = {
  LOGOUT: 'Logout Successfully',
  INVALID_PASS_EMAIL: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized action',
  UNAUTHENTICATED: 'Please login again',
  INTERNAL_ERROR: 'Something went wrong',
  NOT_FOUND: 'Not found',
};

const ROLE = {
  LENDER: 'LENDER',
  BORROWER: 'BORROWER',
};

const LOAN_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
};

const PASSWORD_REGEX = /^[a-zA-Z0-9]{4,}$/;

module.exports = {
  SALT_ROUNDS,
  RES_MESSAGE,
  ROLE,
  LOAN_STATUS,
  INTEREST_RATE,
  PASSWORD_REGEX,
};
