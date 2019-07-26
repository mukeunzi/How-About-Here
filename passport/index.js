const localStrategy = require('./local-strategy');

module.exports = passport => {
	passport.serializeUser((user, done) => {
		done(null, user.user_id);
	});

	passport.deserializeUser(async (user, done) => {
		done(null, user);
	});

	localStrategy(passport);
};
