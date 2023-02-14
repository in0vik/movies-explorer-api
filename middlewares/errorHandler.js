const { statusCodes } = require('../config/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(statusCodes.badRequest.statusCode).send({
      message: err.message,
      statuscode: err.statusCode,
      name: err.name,
    });
  }
  next();
};

module.exports = errorHandler;
