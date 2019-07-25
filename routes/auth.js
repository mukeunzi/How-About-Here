const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isLoggedOut } = require('../middlewares/login-auth');

router.get('/', isLoggedOut, function(req, res, next) {
	res.render('login', { title: 'LOGIN' });
});

router.post('/', isLoggedOut, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth' }));

router.delete('/', isLoggedIn, (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
