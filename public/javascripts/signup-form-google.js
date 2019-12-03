import { isEmptyName } from './signup-form-validation.js';
import { errorMessage } from './utils/error-message.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

window.addEventListener('load', function() {
	const userName = document.querySelector('#user_name');
	const userForm = document.querySelector('form');

	userName.addEventListener('keyup', function(event) {
		checkDuplicatedName(userName.value);
	});

	userForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});
});

const checkDuplicatedName = async userName => {
	try {
		const response = await fetch(`/users/${userName}`, { method: 'GET' });

		if (response.ok) {
			const result = await response.json();

			const message = document.querySelector('#message');

			if (result.message === 'unavailable') {
				message.innerHTML = '이미 사용중인 이름입니다.';
				message.className = 'unavailable';
			} else if (result.message === 'available') {
				message.innerHTML = '사용해도 좋은 이름입니다.';
				message.className = 'available';
			}
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isValidFormData = () => {
	const user_name = document.querySelector('#user_name').value;
	const message = document.querySelector('#message').className;

	if (isEmptyName(user_name)) {
		alert('이름을 입력하세요!');
		return document.querySelector('#user_name').focus();
	}

	if (message === 'unavailable') {
		alert('사용할 수 없는 이름입니다.');
		return document.querySelector('#user_name').focus();
	}

	if (message === 'available' && !isEmptyName(user_name)) {
		return document.querySelector('form').submit();
	}
};
