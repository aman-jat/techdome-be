const test = async (req, res) => {
  try {
    res.send({ status: 'ok' });
  } catch (error) {
    res.status(400).send({
      message: 'Database connection failed',
    });
  }
};

module.exports = { test };
