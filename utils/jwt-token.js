const jwt = require('jsonwebtoken');

const makeToken = async jwtPayload => {
	const { user_name, user_id, auth_provider, user_auth } = jwtPayload;
	const token = await jwt.sign({ user_name, user_id, auth_provider, user_auth }, process.env.JWT_SECRET);

	return token;
};

module.exports = { makeToken };
