const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(403).send('로그인이 필요합니다.');
};

const isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

module.exports = { isLoggedIn, isNotLoggedIn };
