const SALT_ROUNDS = 10;
const INTEREST_RATE = 0;

const RES_MESSAGE = {
  LOGOUT: 'Logout successful',
  INVALID_PASS_EMAIL:
    'Invalid email or password. Please check your credentials and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  UNAUTHENTICATED: 'Authentication failed. Please login again to continue.',
  INTERNAL_ERROR: 'An unexpected error occurred. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
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
