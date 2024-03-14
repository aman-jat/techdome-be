const express = require('express');
const router = express.Router();
const loan = require('../controllers/loan.js');
const mw = require('../middleware/index.js');

router.post('/', mw.checkAuth, mw.checkBorrower, loan.create);

router.get('/', mw.checkAuth, loan.getAll);
router.get('/:id', mw.checkAuth, mw.grabLoan, loan.getOne);

router.put(
  '/:id/approve',
  mw.checkAuth,
  mw.checkLender,
  mw.grabLoan,
  loan.approve
);

router.put(
  '/:id/repay',
  mw.checkAuth,
  mw.checkBorrower,
  mw.grabLoan,
  loan.repay
);

module.exports = router;
