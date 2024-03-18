const bcrypt = require('bcrypt');
const db = require('../lib/db');
const jwt = require('../lib/token');
const {
  SALT_ROUNDS,
  RES_MESSAGE,
  PASSWORD_REGEX,
  ROLE,
} = require('../lib/constants');

const clearCookie = res => {
  res.clearCookie('_auth');
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!password || !PASSWORD_REGEX.test(password)) {
      throw new Error(
        'Password must be at least 4 characters long and contain only letters and digits.'
      );
    }

    // Check if name is not empty string or non-string value
    if (!name || typeof name !== 'string') {
      throw new Error('Name must be provided as a non-empty string.');
    }

    // Check if role is one of the specified values
    if (
      role.toUpperCase() !== ROLE.LENDER &&
      role.toUpperCase() !== ROLE.BORROWER
    ) {
      throw new Error(
        `Role must be either "${ROLE.LENDER}" or "${ROLE.BORROWER}".`
      );
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
      role: role.toUpperCase(),
    });
    const accessToken = jwt.sign({ id: user.id }, user.salt);
    await res.status(201).json({ token: accessToken, member });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message:
        err?.errors?.map(er => er.message).join(', ') ||
        err?.message ||
        RES_MESSAGE.INTERNAL_ERROR,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email } });

    if (!user) {
      throw new Error(RES_MESSAGE.INVALID_PASS_EMAIL);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword || !user) {
      throw new Error(RES_MESSAGE.INVALID_PASS_EMAIL);
    }
    const member = await db.member.findOne({ where: { email } });
    const accessToken = jwt.sign({ id: user.id }, user.salt);
    await res.status(200).json({ token: accessToken, member });
  } catch (err) {
    console.error(err);
    res.status(401).send({
      message: err?.message || RES_MESSAGE.INTERNAL_ERROR,
    });
  }
};

const logout = (req, res) => {
  clearCookie(res);
  res.status(200).json({ status: RES_MESSAGE.LOGOUT });
};

module.exports = { register, login, logout };
