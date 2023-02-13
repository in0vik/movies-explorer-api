const usersRoutes = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUserData } = require('../middlewares/validators');

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', validateUserData, updateCurrentUser);

exports.usersRoutes = usersRoutes;
