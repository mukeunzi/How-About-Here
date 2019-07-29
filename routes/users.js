const express = require('express');
const User = require('../models/user');
const { isNotLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

router.get('/', isNotLoggedIn, (req, res, next) => {
	const flashMessage = req.flash();
	let message = '';

	if (flashMessage.message) {
		message = flashMessage.message[0];
	}

	res.render('sign-up', { title: 'Sign Up', message });
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
	const { user_id, user_password } = req.body;

	try {
		const duplicatedId = await User.checkDuplicatedId(user_id);

		if (duplicatedId) {
			req.flash('message', '이미 사용중인 아이디입니다.');
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
