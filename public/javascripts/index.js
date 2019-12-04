import { errorMessage } from './utils/error-message.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

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
		const response = await fetch('/auth/logout', { method: 'POST' });

		if (response.status === 200) {
			location.href = '/';
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};
