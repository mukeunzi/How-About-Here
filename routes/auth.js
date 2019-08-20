const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-auth');
const authController = require('../controllers/auth-controller');

router.get('/', isNotLoggedIn, authController.getLogInPage);
router.post(
	'/',
	isNotLoggedIn,
	passport.authenticate('local', { failureRedirect: '/auth', failureFlash: true }),
	authController.localLogIn
);
router.delete('/', isLoggedIn, authController.logOut);
router.get('/google-login', isNotLoggedIn, authController.redirectGoogleLogIn);
router.get('/google-oauth2', authController.googleLogIn);

module.exports = router;
