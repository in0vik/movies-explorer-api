const signinRoutes = require('express').Router();
const { signIn, signOut } = require('../controllers/users');
const { validateSignInData } = require('../middlewares/validators');

signinRoutes.post('/', validateSignInData, signIn);
signinRoutes.get('/', signOut);

exports.signinRoutes = signinRoutes;
