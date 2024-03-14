const express = require('express');
const router = express.Router();
const member = require('../controllers/member.js');
const mw = require('../middleware/index.js');

router.get('/me', mw.checkAuth, member.me);

module.exports = router;
