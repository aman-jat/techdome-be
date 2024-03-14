require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { test } = require('./controllers/test');
const authRouter = require('./routes/auth');
const memberRouter = require('./routes/member');

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

app.get('/', test);
app.use('/api/auth', authRouter);
app.use('/api/member', memberRouter);

app.listen(process.env.APP_PORT, () =>
  console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
);
