const express = require('express');
const User = require('../models/user');
const { isLoggedOut } = require('../middlewares/login-auth');

const router = express.Router();

router.get('/', isLoggedOut, (req, res, next) => {
	res.render('sign-up', { title: 'Sign Up' });
});

router.post('/', isLoggedOut, async (req, res, next) => {
	const { user_id, user_password } = req.body;

	try {
		const duplicatedId = await User.checkDuplicatedId(user_id);

		if (duplicatedId) {
			return res.redirect('/users');
		}

		const signUpForm = { user_id, user_password };
		await User.signUp(signUpForm);

		return res.redirect('/auth');
	} catch (error) {
		console.error(error);
		next(error);
	}
});
module.exports = router;
