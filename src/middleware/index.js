const token = require('../lib/token');
const db = require('../lib/db');
const { RES_MESSAGE, ROLE } = require('../lib/constants');

const checkAuth = async (req, res, next) => {
  try {
    const { _auth } = req.cookies;
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

module.exports = { checkAuth, checkLender };
