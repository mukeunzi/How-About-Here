const load = () => {
	window.addEventListener('load', () => {
		const signUpForm = document.querySelector('#signUpForm');

		signUpForm.addEventListener('submit', event => {
			event.preventDefault();
			isValidSignUpData();
		});
	});
};

const isValidSignUpData = () => {};

load();
