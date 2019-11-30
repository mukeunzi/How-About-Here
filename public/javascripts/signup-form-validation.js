const isEmptyName = user_name => {
	if (!user_name) {
		return true;
	}
	return false;
};

const isEmptyId = user_id => {
	if (!user_id) {
		return true;
	}
	return false;
};

const isEmptyPassword = user_password => {
	if (!user_password) {
		return true;
	}
	return false;
};

export { isEmptyName, isEmptyId, isEmptyPassword };
