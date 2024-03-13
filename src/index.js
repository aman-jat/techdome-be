require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(function (err, _, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send({ code: 400, message: 'Invalid JSON in request' });
  } else next();
});
app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
  try {
    res.send({ status: 'ok' });
  } catch (error) {
    res.status(403).send({
      status: 'failed',
      code: 403,
      message: 'Database connection failed',
    });
  }
});

app.listen(process.env.DB_PORT, () => {
  console.log(`App listening at http://localhost:${process.env.DB_PORT}`);
});
