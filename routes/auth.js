const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-auth');

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

module.exports = router;
