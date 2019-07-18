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
	const user_pwd = document.querySelector('#user_pwd').value;

	if (isValidId(user_id) && isValidPassword(user_pwd)) {
	}
};

const isValidId = user_id => {
	if (!user_id) {
		return document.querySelector('#user_id').focus();
	}
	return true;
};

const isValidPassword = user_pwd => {
	if (!user_pwd) {
		return document.querySelector('#user_pwd').focus();
	}
	return true;
};

load();
