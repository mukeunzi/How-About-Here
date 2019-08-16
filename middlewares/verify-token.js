const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
	if (!req.cookies.token) {
		req.user = false;
		return next();
	}

	try {
		const token = req.cookies.token;
		const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
		const { user_id } = decodedToken;

		const user = await User.getUserInfo(user_id);

		if (!user) {
			req.user = false;
			return next();
		}

		req.user = decodedToken;
		return next();
	} catch (error) {
		next(error);
	}
};

module.exports = { verifyToken };
