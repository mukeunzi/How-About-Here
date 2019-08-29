const load = () => {
	window.addEventListener('load', () => {
		const logInButton = document.querySelector('#logInButton');
		const signUpButton = document.querySelector('#signUpButton');
		const logOutButton = document.querySelector('#logOutButton');
		const postButton = document.querySelector('#postButton');

		if (logOutButton) {
			logOutButton.addEventListener('click', () => {
				logOut();
			});
			postButton.addEventListener('click', () => {
				location.href = '/admin/post';
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
	const response = await fetch('/auth/logout', { method: 'POST' });
	console.log(await response.text());
	location.href = '/';
};

load();
