const loadIndex = () => {
	window.addEventListener('load', () => {
		const logInButton = document.querySelector('#logInButton');
		const signUpButton = document.querySelector('#signUpButton');
		const logOutButton = document.querySelector('#logOutButton');
		const postButton = document.querySelector('#postButton');
		const adminButton = document.querySelector('#adminButton');

		if (logOutButton && postButton) {
			logOutButton.addEventListener('click', () => {
				logOut();
			});

			postButton.addEventListener('click', () => {
				location.href = '/post';
			});

			if (adminButton) {
				adminButton.addEventListener('click', () => {
					location.href = '/admin';
				});
			}
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
	await fetch('/auth/logout', { method: 'POST' });
	location.href = '/';
};

loadIndex();
