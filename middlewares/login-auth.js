const isLoggedIn = (req, res, next) => {
	if (req.user) {
		return next();
	}
	res.status(403).send('로그인이 필요합니다.');
};

const isLoggedInForAjax = (req, res, next) => {
	if (req.user) {
		return next();
	}
	res.send('notLoggedIn');
};

const isNotLoggedIn = (req, res, next) => {
	if (!req.user) {
		return next();
	}
	res.redirect('/');
};

module.exports = { isLoggedIn, isLoggedInForAjax, isNotLoggedIn };
