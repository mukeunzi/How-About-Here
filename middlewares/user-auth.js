const isAdmin = (req, res, next) => {
	if (req.user.userAuth === 'admin') {
		return next();
	}

	res.status(403).end();
};

module.exports = { isAdmin };
