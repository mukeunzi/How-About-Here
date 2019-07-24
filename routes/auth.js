const express = require('express');
const router = express.Router();
const { isLoggedOut } = require('../middlewares/login-auth');

router.get('/', isLoggedOut, function(req, res, next) {
	res.render('login', { title: 'LOGIN' });
});

module.exports = router;
