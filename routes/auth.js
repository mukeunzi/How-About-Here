const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isLoggedOut } = require('../middlewares/login-auth');

router.get('/', isLoggedOut, function(req, res, next) {
	const flashMessage = req.flash();
	let message = '';

	if (flashMessage.error) {
		message = flashMessage.error[0];
	}
	res.render('login', { title: 'LOGIN', message });
});

router.post(
	'/',
	isLoggedOut,
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth', failureFlash: true })
);

router.delete('/', isLoggedIn, (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
