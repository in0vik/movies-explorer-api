const signinRoutes = require('express').Router();
const { signIn } = require('../controllers/users');
const { validateSignInData } = require('../middlewares/validators');

signinRoutes.post('/', validateSignInData, signIn);

exports.signinRoutes = signinRoutes;
