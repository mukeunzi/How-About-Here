const load = () => {
	window.addEventListener('load', () => {
		const logInButton = document.querySelector('#logInButton');
		const signUpButton = document.querySelector('#signUpButton');
		const logOutButton = document.querySelector('#logOutButton');

		if (logOutButton) {
			logOutButton.addEventListener('click', () => {
				logOut();
			});
		} else {
			logInButton.addEventListener('click', () => {
				location.href = '/auth';
			});
			signUpButton.addEventListener('click', () => {
				location.href = '/users';
			});
		}
	});
};

const logOut = async () => {
	const response = await fetch('/auth', { method: 'DELETE' });

	if (response.ok) {
		const statusMessage = await response.text();
		if (statusMessage === 'successLogOut') {
			location.href = '/';
		}
	}
};

load();
