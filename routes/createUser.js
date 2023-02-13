const createUserRoutes = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateSignUpData } = require('../middlewares/validators');

createUserRoutes.post('/', validateSignUpData, createUser);

exports.createUserRoutes = createUserRoutes;
