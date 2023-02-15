const signoutRoutes = require('express').Router();
const { signOut } = require('../controllers/users');

signoutRoutes.post('/', signOut);

exports.signoutRoutes = signoutRoutes;
