const load = () => {
	window.addEventListener('load', () => {
		const signUpForm = document.querySelector('#signUpForm');

		signUpForm.addEventListener('submit', event => {
			event.preventDefault();
			isValidSignUpData();
		});
	});
};

const isValidSignUpData = () => {
	const user_id = document.querySelector('#user_id').value;
	const user_password = document.querySelector('#user_password').value;

	if (isValidId(user_id) && isValidPassword(user_password)) {
		document.querySelector('#signUpForm').submit();
	}
};

const isValidId = user_id => {
	if (!user_id) {
		return document.querySelector('#user_id').focus();
	}
	return true;
};

const isValidPassword = user_password => {
	if (!user_password) {
		return document.querySelector('#user_password').focus();
	}
	return true;
};

load();
