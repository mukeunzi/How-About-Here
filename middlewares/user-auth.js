const isAdmin = (req, res, next) => {
	if (req.user.user_auth === 'admin') {
		return next();
	}

	res.status(403).end();
};

module.exports = { isAdmin };
