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

const isValidFormData = () => {
	const userId = document.querySelector('#userId').value;
	const userPassword = document.querySelector('#userPassword').value;

	if (isEmptyId(userId)) {
		alert('아이디를 입력하세요!');
		return document.querySelector('#userId').focus();
	}

	if (isEmptyPassword(userPassword)) {
		alert('비밀번호를 입력하세요!');
		return document.querySelector('#userPassword').focus();
	}

	return document.querySelector('form').submit();
};

const isEmptyId = userId => {
	if (!userId) {
		return true;
	}
	return false;
};

const isEmptyPassword = userPassword => {
	if (!userPassword) {
		return true;
	}
	return false;
};
