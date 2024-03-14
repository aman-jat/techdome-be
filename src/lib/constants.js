const SALT_ROUNDS = 10;

const RES_MESSAGE = {
  LOGOUT: 'Logout Successfully',
  INVALID_PASS_EMAIL: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized action',
  UNAUTHENTICATED: 'Please login again',
  INTERNAL_ERROR: 'Something went wrong',
};

const ROLE = {
  LENDER: 'LENDER',
  BORROWER: 'BORROWER',
};

module.exports = { SALT_ROUNDS, RES_MESSAGE, ROLE };
