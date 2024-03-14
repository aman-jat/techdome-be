const { RES_MESSAGE } = require('../lib/constants');

const me = async (req, res) => {
  try {
    res.send(req.auth.user);
  } catch (error) {
    res.status(400).send({
      message: RES_MESSAGE.INTERNAL_ERROR,
    });
  }
};

module.exports = { me };
