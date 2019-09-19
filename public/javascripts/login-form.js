const load = () => {
	window.addEventListener('load', function() {
		const googleLogInButton = document.querySelector('#googleLogInButton');
		const userForm = document.querySelector('form');

		googleLogInButton.addEventListener('click', function(event) {
			location.href = '/auth/google-login';
		});

		userForm.addEventListener('submit', function(event) {
			event.preventDefault();
			isValidFormData();
		});
	});
};

const isValidFormData = () => {
	const user_id = document.querySelector('#user_id').value;
	const user_password = document.querySelector('#user_password').value;

	if (isEmptyId(user_id)) {
		alert('아이디를 입력하세요!');
		return document.querySelector('#user_id').focus();
	}

	if (isEmptyPassword(user_password)) {
		alert('비밀번호를 입력하세요!');
		return document.querySelector('#user_password').focus();
	}

	return document.querySelector('form').submit();
};

const isEmptyId = user_id => {
	if (!user_id) {
		return true;
	}
	return false;
};

const isEmptyPassword = user_password => {
	if (!user_password) {
		return true;
	}
	return false;
};

load();
