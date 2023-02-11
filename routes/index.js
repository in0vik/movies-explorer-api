const express = require("express");

const routes = express.Router();
const { signinRoutes } = require("./login");
const { createUserRoutes } = require("./createUser");
const { usersRoutes } = require("./users");
const { moviesRoutes } = require("./movies");
const auth = require("../middlewares/auth");

routes.use('/signin', signinRoutes);
routes.use('/signout', signinRoutes);
routes.use('/signup', createUserRoutes);
routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);

module.exports = routes;
