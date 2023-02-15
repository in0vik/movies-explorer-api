const express = require('express');

const routes = express.Router();
const { signinRoutes } = require('./login');
const { signoutRoutes } = require('./logout');
const { createUserRoutes } = require('./createUser');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { statusCodes } = require('../config/constants');

routes.use('/signin', signinRoutes);
routes.use('/signup', createUserRoutes);
routes.use('/signout', signoutRoutes);
routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('*', auth, (req, res, next) => {
  next(new NotFoundError(statusCodes.notFound.message.default));
});

module.exports = routes;
