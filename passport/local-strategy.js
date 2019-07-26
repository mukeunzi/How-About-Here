const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = passport => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'user_id',
				passwordField: 'user_password'
			},
			async (user_id, user_password, done) => {
				try {
					const userInfo = await User.getUserInfo(user_id);

					if (!userInfo) {
						return done(null, false, { message: '아이디나 비밀번호가 올바르지 않습니다.' });
					}

					const isValidUser = await bcrypt.compare(user_password, userInfo.user_password);

					if (!isValidUser) {
						return done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
					}
					return done(null, userInfo);
				} catch (error) {
					console.error(error);
					return done(error);
				}
			}
		)
	);
};
