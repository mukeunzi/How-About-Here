const bcrypt = require('bcrypt');
const User = require('../models/user');
const AuthController = require('./auth-controller');
const jwtUtil = require('../utils/jwt-token');

class UserController {
	async createUser(req, res, next) {
		const { user_name, user_id, user_password, auth_provider } = req.body;

		try {
			const duplicatedId = await User.checkDuplicatedId(user_id, auth_provider);
			const duplicatedName = await User.checkDuplicatedName(user_name);

			if (duplicatedName) {
				req.flash('message', '이미 사용중인 이름입니다.');
				return res.redirect('/users');
			}

			if (duplicatedId) {
				req.flash('message', '이미 사용중인 아이디입니다.');
				return res.redirect('/users');
			}

			const hashPassword = user_password ? await bcrypt.hash(user_password, 12) : '';

			const signUpForm = { user_name, user_id, hashPassword, auth_provider };
			await User.signUp(signUpForm);

			if (auth_provider === 'local') {
				return AuthController.localLogIn(req, res, next);
			}

			const user = await User.getUserInfo(user_id);
			req.user = user;

			const token = await jwtUtil.makeToken(req.user);
			res.cookie('token', token, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 });

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	getSignUpPage(req, res) {
		const flashMessage = req.flash();
		let message = '';

		if (flashMessage.message) {
			message = flashMessage.message[0];
		}

		res.render('sign-up', { title: 'Sign Up', user: req.user, message });
	}

	async isValidUserName(req, res, next) {
		const user_name = req.params.user_name;

		try {
			const duplicatedName = await User.checkDuplicatedName(user_name);

			if (duplicatedName) {
				return res.send('unavailable');
			}
			return res.send('available');
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
