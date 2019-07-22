const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('sign-up', { title: 'Sign Up' });
});

module.exports = router;
