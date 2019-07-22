const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('sign-up', { title: 'Sign Up' });
});

router.post('/', async (req, res, next) => {
	const { user_id, user_password } = req.body;

	try {
		const duplicatedId = await User.checkDuplicatedId(user_id);

		if (duplicatedId) {
			return res.redirect('/users');
		}

		const user = new User({
			user_id,
			user_password,
			user_auth: 'user',
			user_score: 0,
			user_ranking: 0
		});

		const createUser = await user.save();

		if (createUser) {
			return res.redirect('/');
		}
		next(500);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
