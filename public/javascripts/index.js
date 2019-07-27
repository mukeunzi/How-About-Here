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

const logout = async () => {
	const response = await fetch('/auth', { method: 'DELETE' });

	if (response.ok) {
		const statusMessage = await response.text();
		if (statusMessage === 'successLogout') {
			location.href = '/';
		}
	}
};

load();
