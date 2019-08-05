const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-auth');
const { url, googleLogIn } = require('../config/google-oauth');
const authController = require('../controllers/auth-controller');

router.get('/', isNotLoggedIn, function(req, res) {
	const flashMessage = req.flash();
	let message = '';

	if (flashMessage.error) {
		message = flashMessage.error[0];
	}
	res.render('login', { title: 'LOGIN', message });
});

router.post(
	'/',
	isNotLoggedIn,
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth', failureFlash: true })
);

router.delete('/', isLoggedIn, (req, res) => {
	req.logout();
	req.session.destroy();
	res.send('successLogOut');
});

router.get('/google-login', isNotLoggedIn, (req, res) => {
	res.redirect(url);
});

router.get('/google-oauth2', async (req, res) => {
	try {
		const displayName = await googleLogIn(req.query.code);
		console.log(displayName);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
