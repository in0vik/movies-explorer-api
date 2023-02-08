const usersRoutes = require("express").Router();
const { celebrate, Joi } = require("celebrate");

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', validateUserData, updateCurrentUser);