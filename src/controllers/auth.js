const bcrypt = require('bcrypt');
const db = require('../lib/db');
const jwt = require('../lib/token');
const { SALT_ROUNDS, RES_MESSAGE } = require('../lib/constants');

const clearCookie = res => {
  res.clearCookie('_auth');
};

const setCookie = (res, user) => {
  let options = { expires: new Date(Date.now() + 30 * 24 * 3600 * 1000) };
  res.cookie('_auth', jwt.sign({ id: user.id }, user.salt), options);
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      throw new Error();
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.user.create({
      email,
      password: hashedPassword,
      salt,
    });
    const member = await db.member.create({
      email,
      user_id: user.dataValues.id,
      name,
      role,
    });
    clearCookie(res);
    setCookie(res, user);
    await res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message:
        err?.errors?.map(er => er.message).join(', ') || 'Invalid payload',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email } });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword || !user) {
      throw new Error();
    }
    const member = await db.member.findOne({ where: { email } });
    clearCookie(res);
    setCookie(res, user);
    res.status(200).json(member);
  } catch (err) {
    console.error(err);
    res.status(401).send({
      message: RES_MESSAGE.INVALID_PASS_EMAIL,
    });
  }
};

const logout = (req, res) => {
  clearCookie(res);
  res.status(200).json({ status: RES_MESSAGE.LOGOUT });
};

module.exports = { register, login, logout };
