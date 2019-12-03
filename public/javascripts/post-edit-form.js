import { notCheckedTag, notCheckedStarRating, isEmptyContents } from './post-form-validation.js';
import { errorMessage } from './utils/error-message.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

window.addEventListener('load', function() {
	const starRating = document.querySelector('#star_rating').value;
	const postEditForm = document.querySelector('#postEditForm');

	$('.ui.rating').rating({
		initialRating: parseInt(starRating, 10),
		maxRating: 5
	});

	postEditForm.addEventListener('submit', function(event) {
		event.preventDefault();
		updatePostEvent();
	});
});

const isValidFormData = () => {
	const tag_list = document.querySelectorAll('.tag_list:checked');
	const star_rating = $('.ui.star.rating').rating('get rating');
	const post_contents = document.querySelector('#post_contents').value;

	if (notCheckedTag(tag_list.length)) {
		alert('해시태그를 선택해주세요!');
		return document.querySelector('.tag_list').focus();
	}

	if (notCheckedStarRating(star_rating)) {
		alert('별점을 선택해주세요!');
		return document.querySelector('#star_rating').focus();
	}

	if (isEmptyContents(post_contents)) {
		alert('후기를 입력하세요!');
		return document.querySelector('#post_contents').focus();
	}

	const starRating = $('.ui.star.rating').rating('get rating');
	document.querySelector('#star_rating').value = starRating;

	return { tag_list, star_rating, post_contents };
};

const updatePostEvent = async () => {
	const updatePostForm = isValidFormData();
	const { tag_list } = updatePostForm;

	const tagList = convertTagListToArray(tag_list);
	updatePostForm.tag_list = tagList;

	const post_id = window.location.pathname.substring(11);

	try {
		const response = await fetch(`/post/${post_id}`, {
			method: 'PATCH',
			body: JSON.stringify(updatePostForm),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			location.href = `/post/${post_id}`;
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const convertTagListToArray = tag_list => {
	const tagList = Array.prototype.map.call(tag_list, tag => {
		return `${tag.value}`;
	});

	return tagList;
};
