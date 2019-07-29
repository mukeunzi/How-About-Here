const localStrategy = require('./local-strategy');
const User = require('../models/user');

module.exports = passport => {
	passport.serializeUser((user, done) => {
		done(null, user.user_id);
	});

	passport.deserializeUser(async (user_id, done) => {
		const user = await User.getUserInfo(user_id);

		done(null, user);
	});

	localStrategy(passport);
};
