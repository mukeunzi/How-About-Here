const bcrypt = require('bcrypt');
const db = require('../schema');
const AuthController = require('./auth-controller');
const jwtUtil = require('../utils/jwt-token');

class UserController {
	async createUser(req, res, next) {
		const { userName, userId, userPassword, authProvider } = req.body;

		const duplicatedName = await db.User.checkDuplicatedName(userName);
		const duplicatedId = await db.User.checkDuplicatedId(userId);

		if (duplicatedName) {
			req.flash('message', '이미 사용중인 이름입니다.');
			return res.redirect('/users');
		}

		if (duplicatedId) {
			req.flash('message', '이미 사용중인 아이디입니다.');
			return res.redirect('/users');
		}

		const hashPassword = userPassword ? await bcrypt.hash(userPassword, 12) : '';

		const signUpForm = { userName, userId, userPassword: hashPassword, authProvider };
		await db.User.signUp(signUpForm);

		if (authProvider === 'local') {
			return AuthController.localLogIn(req, res, next);
		}

		const user = await db.User.getUserInfo(userId);

		const token = await jwtUtil.makeToken(user);
		res.cookie('token', token, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 });

		return res.redirect('/');
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
		const userName = req.params.userName;

		const duplicatedName = await db.User.checkDuplicatedName(userName);

		if (duplicatedName) {
			return res.json({ message: 'unavailable' });
		}
		return res.json({ message: 'available' });
	}
}

module.exports = new UserController();
