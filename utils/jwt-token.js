const jwt = require('jsonwebtoken');

const makeToken = async jwtPayload => {
	const { userName, userId, authProvider, userAuth } = jwtPayload;
	const token = await jwt.sign({ userName, userId, authProvider, userAuth }, process.env.JWT_SECRET);

	return token;
};

module.exports = { makeToken };
