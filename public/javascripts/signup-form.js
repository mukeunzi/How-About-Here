import { isEmptyName, isEmptyId, isEmptyPassword } from './signup-form-validation.js';

window.addEventListener('load', function() {
	const userForm = document.querySelector('form');

	userForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});
});

const isValidFormData = () => {
	const userName = document.querySelector('#userName').value;
	const userId = document.querySelector('#userId').value;
	const userPassword = document.querySelector('#userPassword').value;

	if (isEmptyName(userName)) {
		alert('이름을 입력하세요!');
		return document.querySelector('#userName').focus();
	}

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
