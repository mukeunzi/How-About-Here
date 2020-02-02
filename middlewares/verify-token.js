const jwt = require('jsonwebtoken');
const db = require('../schema');

const verifyToken = async (req, res, next) => {
	if (!req.cookies.token) {
		req.user = null;
		return next();
	}

	try {
		const token = req.cookies.token;
		const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
		const { userId } = decodedToken;

		const user = await db.User.getUserInfo(userId);

		if (!user) {
			req.user = null;
			return next();
		}

		req.user = user;
		return next();
	} catch (error) {
		next(error);
	}
};

module.exports = { verifyToken };
