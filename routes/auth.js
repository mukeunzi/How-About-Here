const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedOut } = require('../middlewares/login-auth');

router.get('/', isLoggedOut, function(req, res, next) {
	res.render('login', { title: 'LOGIN' });
});

router.post(
	'/',
	isLoggedOut,
	passport.authenticate('local', { failureRedirect: '/auth', failureFlash: true }),
	function(req, res, next) {
		res.render('index');
	}
);

module.exports = router;
