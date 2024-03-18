const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.js');
const mw = require('../middleware/index.js');

router.post(
  '/register',
  mw.checkPayload(['name', 'email', 'password', 'role']),
  auth.register
);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

module.exports = router;
