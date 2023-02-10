const signinRoutes = require('express').Router();
const { signIn, signOut } = require('../controllers/users');
const { validateAuthData } = require('../middlewares/validators');

signinRoutes.post('/', validateAuthData, signIn);
signinRoutes.get('/', signOut);

exports.signinRoutes = signinRoutes;