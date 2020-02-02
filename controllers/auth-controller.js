const { url, googleLogIn } = require('../utils/google-oauth');
const db = require('../schema');
const jwtUtil = require('../utils/jwt-token');

class AuthController {
	async localLogIn(req, res, next) {
		const { userId, userPassword } = req.body;

		const user = await db.User.getUserInfo(userId);

		if (!user) {
			req.flash('message', '아이디나 비밀번호가 올바르지 않습니다.');
			return res.redirect('/auth');
		}

		const isValidUser = await user.isValidPassword(userPassword);

		if (!isValidUser) {
			req.flash('message', '비밀번호가 올바르지 않습니다.');
			return res.redirect('/auth');
		}

		const token = await jwtUtil.makeToken(user);
		res.cookie('token', token, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 });

		return res.redirect('/');
	}

	async googleLogIn(req, res, next) {
		const googleUserData = await googleLogIn(req.query.code);
		const { userId, authProvider } = googleUserData;

		const duplicatedId = await db.User.checkDuplicatedId(userId, authProvider);

		if (!duplicatedId) {
			return res.render('sign-up-google', { googleUserData });
		}

		const user = await db.User.getUserInfo(userId);

		const token = await jwtUtil.makeToken(user);
		res.cookie('token', token, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 });

		return res.redirect('/');
	}

	redirectGoogleLogIn(req, res) {
		res.redirect(url);
	}

	logOut(req, res) {
		res.clearCookie('token', { path: '/', httpOnly: true });

		return res.json({});
	}

	getLogInPage(req, res) {
		const flashMessage = req.flash();
		let message = '';

		if (flashMessage.message) {
			message = flashMessage.message[0];
		}
		res.render('login', { title: 'LOGIN', user: req.user, message });
	}
}

module.exports = new AuthController();
