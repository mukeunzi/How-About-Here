const isLoggedIn = (req, res, next) => {
	if (req.user) {
		return next();
	}
	res.redirect('/auth');
};

const isLoggedInForAjax = (req, res, next) => {
	if (req.user) {
		return next();
	}
	res.json({ message: 'notLoggedIn' });
};

const isNotLoggedIn = (req, res, next) => {
	if (!req.user) {
		return next();
	}
	res.redirect('/');
};

module.exports = { isLoggedIn, isLoggedInForAjax, isNotLoggedIn };
