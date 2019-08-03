const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-auth');
const { url, googleLogin } = require('../config/google-oauth');

router.get('/', isNotLoggedIn, function(req, res, next) {
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
	res.send('successLogout');
});

router.get('/google-login', isNotLoggedIn, (req, res) => {
	res.redirect(url);
});

router.get('/google-oauth2', async (req, res) => {
	try {
		const displayName = await googleLogin(req.query.code);
		console.log(displayName);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
