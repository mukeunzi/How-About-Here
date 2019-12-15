const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

const isLoggedInUser = message => {
	if (message === 'notLoggedIn') {
		return false;
	}
	return true;
};

const sendRequest = async (url = '', method = 'GET') => {
	const response = await fetch(url, { method });

	if (!response.ok) {
		throw new Error(INTERNAL_SERVER_ERROR);
	}

	const result = await response.json();

	return result;
};

const sendData = async (url = '', method, data = {}) => {
	const response = await fetch(url, {
		method,
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	});

	if (!response.ok) {
		throw new Error(INTERNAL_SERVER_ERROR);
	}

	const result = await response.json();

	return result;
};

export { isLoggedInUser, sendRequest, sendData };
