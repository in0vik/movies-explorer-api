const createUserRoutes = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateAuthData } = require('../middlewares/validators');

createUserRoutes.post('/', validateAuthData, createUser);

exports.createUserRoutes = createUserRoutes;