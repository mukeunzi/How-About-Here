const localStrategy = require('./local-strategy');
const User = require('../models/user');

module.exports = passport => {
	passport.serializeUser((userInfo, done) => {
		done(null, userInfo.user_id);
	});

	passport.deserializeUser(async (user_id, done) => {
		try {
			const userInfo = await User.findOne({ user_id });

			if (userInfo) {
				done(null, userInfo);
			}
		} catch (error) {
			done(error);
		}
	});

	localStrategy(passport);
};
