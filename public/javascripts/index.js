const load = () => {
	window.addEventListener('load', () => {
		const loginButton = document.querySelector('#loginButton');
		const signUpButton = document.querySelector('#signUpButton');
		const logoutButton = document.querySelector('#logoutButton');

		if (logoutButton) {
			logoutButton.addEventListener('click', () => {
				logout();
			});
		} else {
			loginButton.addEventListener('click', () => {
				location.href = '/auth';
			});
			signUpButton.addEventListener('click', () => {
				location.href = '/users';
			});
		}
	});
};

load();
