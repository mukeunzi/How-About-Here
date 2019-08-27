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
	const post_title = document.querySelector('#post_title').value;
	const first_candidate = document.querySelector('#first_candidate').value;
	const second_candidate = document.querySelector('#second_candidate').value;

	if (isEmptyTitle(post_title)) {
		alert('제목을 입력하세요!');
		return document.querySelector('#post_title').focus();
	}

	if (isEmptyFirst(first_candidate)) {
		alert('첫번째 후보를 입력하세요!');
		return document.querySelector('#first_candidate').focus();
	}

	if (isEmptySecond(second_candidate)) {
		alert('두번째 후보를 입력하세요!');
		return document.querySelector('#second_candidate').focus();
	}

	return document.querySelector('form').submit();
};

const isEmptyTitle = post_title => {
	if (!post_title) {
		return true;
	}
	return false;
};

const isEmptyFirst = first_candidate => {
	if (!first_candidate) {
		return true;
	}
	return false;
};

const isEmptySecond = second_candidate => {
	if (!second_candidate) {
		return true;
	}
	return false;
};

load();
