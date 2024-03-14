require('dotenv').config();
const jwt = require('jsonwebtoken');
const hash = require('object-hash');

const sign = (payload, salt, opt = {}) => {
  return jwt.sign(
    payload,
    hash({ secret: process.env.AUTH_SECRET, salt }),
    opt
  );
};

const verify = (token, salt) => {
  return jwt.verify(token, hash({ secret: process.env.AUTH_SECRET, salt }));
};

const decode = token => {
  return jwt.decode(token);
};

const check = (token, salt) => {
  try {
    return verify(token, salt);
  } catch (error) {
    return false;
  }
};

module.exports = { sign, decode, verify, check };
