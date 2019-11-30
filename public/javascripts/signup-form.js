import { isEmptyName, isEmptyId, isEmptyPassword } from './signup-form-validation.js';

window.addEventListener('load', function() {
	const userForm = document.querySelector('form');

	userForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});
});

const isValidFormData = () => {
	const user_name = document.querySelector('#user_name').value;
	const user_id = document.querySelector('#user_id').value;
	const user_password = document.querySelector('#user_password').value;

	if (isEmptyName(user_name)) {
		alert('이름을 입력하세요!');
		return document.querySelector('#user_name').focus();
	}

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
