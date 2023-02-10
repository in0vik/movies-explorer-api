const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const NotFoundError = require('./errors/NotFoundError');
const { errors } = require("celebrate");
const { PORT, DB_ADDRESS } = require("./config/config");
const { mongoose } = require("mongoose");
const routes = require("./routes");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

mongoose.connect(DB_ADDRESS);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('rabotaet');
})