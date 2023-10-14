const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./Database/Database');
const indexRouter = require('./routes/index');
const cors = require('cors')
const app = express();

database.connectToDatabase();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.options('/edit', (req, res) => {
//   res.header('Access-Control-Allow-Methods', 'PUT');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.sendStatus(204); // Respond with a successful status
// });
app.use('/', indexRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
