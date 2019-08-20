const { url, googleLogIn } = require('../config/google-oauth');
const User = require('../models/user');
const jwtUtil = require('../utils/jwt-token');

class AuthController {
	async localLogIn(req, res, next) {
		try {
			const token = await jwtUtil.makeToken(req.user);
			res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	async googleLogIn(req, res, next) {
		try {
			const googleUserData = await googleLogIn(req.query.code);
			const { user_id, auth_provider } = googleUserData;

			const duplicatedId = await User.checkDuplicatedId(user_id, auth_provider);

			if (!duplicatedId) {
				await User.signUp(googleUserData);
			}

			const token = await jwtUtil.makeToken(googleUserData);
			res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	redirectGoogleLogIn(req, res) {
		res.redirect(url);
	}

	logOut(req, res) {
		req.logout();
		req.session.destroy();
		res.send('successLogOut');
	}

	getLogInPage(req, res) {
		const flashMessage = req.flash();
		let message = '';

		if (flashMessage.error) {
			message = flashMessage.error[0];
		}
		res.render('login', { title: 'LOGIN', message });
	}
}

module.exports = new AuthController();
