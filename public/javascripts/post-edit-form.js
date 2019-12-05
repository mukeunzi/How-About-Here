import { notCheckedTag, notCheckedStarRating, isEmptyContents } from './post-form-validation.js';
import { errorMessage } from './utils/error-message.js';
import { isLoggedInUser, sendData } from './utils/fetch-api.js';

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

	if (!updatePostForm) {
		return;
	}

	const { tag_list } = updatePostForm;

	const tagList = convertTagListToArray(tag_list);
	updatePostForm.tag_list = tagList;

	const post_id = window.location.pathname.substring(11);

	try {
		const result = await sendData(`/post/${post_id}`, 'PATCH', updatePostForm);

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		location.href = `/post/${post_id}`;
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
