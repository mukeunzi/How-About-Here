import { isEmptyName } from './signup-form-validation.js';
import { errorMessage } from './utils/error-message.js';
import { sendRequest } from './utils/fetch-api.js';

window.addEventListener('load', function() {
	const userName = document.querySelector('#userName');
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
	if (isEmptyName(userName)) {
		return;
	}

	try {
		const result = await sendRequest(`/users/${userName}`, 'GET');

		const message = document.querySelector('#message');

		if (result.message === 'unavailable') {
			message.innerHTML = '이미 사용중인 이름입니다.';
			message.className = 'unavailable';
		} else if (result.message === 'available') {
			message.innerHTML = '사용해도 좋은 이름입니다.';
			message.className = 'available';
		}
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isValidFormData = () => {
	const userName = document.querySelector('#userName').value;
	const message = document.querySelector('#message').className;

	if (isEmptyName(userName)) {
		alert('이름을 입력하세요!');
		return document.querySelector('#userName').focus();
	}

	if (message === 'unavailable') {
		alert('사용할 수 없는 이름입니다.');
		return document.querySelector('#userName').focus();
	}

	if (message === 'available' && !isEmptyName(userName)) {
		return document.querySelector('form').submit();
	}
};
