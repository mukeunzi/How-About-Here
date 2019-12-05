import { errorMessage } from './utils/error-message.js';
import { sendRequest } from './utils/fetch-api.js';

window.addEventListener('load', () => {
	const logOutButton = document.querySelector('#logOutButton');

	if (logOutButton) {
		logOutButton.addEventListener('click', () => {
			logOut();
		});
	}
});

const logOut = async () => {
	try {
		await sendRequest('/auth/logout', 'DELETE');

		location.href = '/';
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};
