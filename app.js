require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors: celebrateErrors } = require('celebrate');
const { mongoose } = require('mongoose');
const { PORT, DB_ADDRESS } = require('./config/config');
const NotFoundError = require('./errors/NotFoundError');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

mongoose.connect(DB_ADDRESS);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Page Not Found'));
});
app.use(celebrateErrors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App is listening port: ${PORT}`);
});
