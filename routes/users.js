const express = require('express');
const bcrypt = require('bcrypt');
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

		const hashPassword = await bcrypt.hash(user_password, 12);

		const user = new User({
			user_id,
			user_password: hashPassword,
			user_auth: 'user',
			user_score: 0,
			user_ranking: 0
		});

		const createUser = await user.save();

		if (createUser) {
			return res.redirect('/auth');
		}
		next(500);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
