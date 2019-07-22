const load = () => {
	window.addEventListener('load', function() {
		const userForm = document.querySelector('form');

		userForm.addEventListener('submit', function(event) {
			event.preventDefault();
			isValidFormData();
		});
	});
};

const isValidFormData = () => {
	const user_id = document.querySelector('#user_id').value;
	const user_password = document.querySelector('#user_password').value;

	if (!isEmptyId(user_id) && !isEmptyPassword(user_password)) {
		document.querySelector('form').submit();
	}
};

const isEmptyId = user_id => {
	if (!user_id) {
		return document.querySelector('#user_id').focus();
	}
	return false;
};

const isEmptyPassword = user_password => {
	if (!user_password) {
		return document.querySelector('#user_password').focus();
	}
	return false;
};

load();
