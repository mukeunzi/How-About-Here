const isEmptyName = userName => {
	if (!userName) {
		return true;
	}
	return false;
};

const isEmptyId = userId => {
	if (!userId) {
		return true;
	}
	return false;
};

const isEmptyPassword = userPassword => {
	if (!userPassword) {
		return true;
	}
	return false;
};

export { isEmptyName, isEmptyId, isEmptyPassword };
