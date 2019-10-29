window.addEventListener('load', () => {
	const logOutButton = document.querySelector('#logOutButton');

	if (logOutButton) {
		logOutButton.addEventListener('click', () => {
			logOut();
		});
	}
});

const logOut = async () => {
	await fetch('/auth/logout', { method: 'POST' });
	location.href = '/';
};
