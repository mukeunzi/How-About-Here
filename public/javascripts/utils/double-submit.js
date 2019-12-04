let isDouble = false;

const isDoubleSubmit = () => {
	if (isDouble) {
		return isDouble;
	}

	isDouble = true;
	return false;
};

export { isDoubleSubmit };
