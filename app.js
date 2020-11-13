const express = require('express');
const morgan = require('morgan');
// console.log(uuid.v4());
const app = express();
const tourRouter = require('./routes/tours-route');
const usersRouter = require('./routes/users-route');

app.use(express.json());
// ! middleware
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route handler
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
