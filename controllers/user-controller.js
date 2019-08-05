const User = require('../models/user');

class UserController {
	async signUp(req, res, next) {
		const { user_id, user_password } = req.body;

		try {
			const duplicatedId = this.checkDuplicatedId(user_id, 'local');

			if (duplicatedId) {
				req.flash('message', '이미 사용중인 아이디입니다.');
				return res.redirect('/users');
			}

			const signUpForm = { user_id, user_password, auth_provider: 'local' };
			await User.signUp(signUpForm);

			return res.redirect('/auth');
		} catch (error) {
			console.error(error);
			next(error);
		}
	}

	async checkDuplicatedId(user_id, auth_provider) {
		const duplicatedId = await User.checkDuplicatedId(user_id, auth_provider);

		return duplicatedId;
	}

	getSignUpPage(req, res) {
		const flashMessage = req.flash();
		let message = '';

		if (flashMessage.message) {
			message = flashMessage.message[0];
		}

		res.render('sign-up', { title: 'Sign Up', message });
	}
}

module.exports = new UserController();
