import {
	notCheckedTag,
	isEmptyTitle,
	notCheckedStarRating,
	isEmptyPhoto,
	isEmptyContents
} from './post-form-validation.js';

window.addEventListener('load', function() {
	const postForm = document.querySelector('#postForm');

	postForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});

	$('.ui.rating').rating({
		initialRating: 0,
		maxRating: 5
	});
});

const isValidFormData = () => {
	const place_name = document.querySelector('#place_name').value;
	const tag_list = document.querySelectorAll('.tag_list:checked').length;
	const star_rating = $('.ui.star.rating').rating('get rating');
	const post_contents = document.querySelector('#post_contents').value;
	const photo_link = document.querySelector('#photo_link').value;

	if (isEmptyTitle(place_name)) {
		alert('장소를 입력하세요!');
		return document.querySelector('#keyword').focus();
	}

	if (notCheckedTag(tag_list)) {
		alert('해시태그를 선택해주세요!');
		return document.querySelector('.tag_list').focus();
	}

	if (notCheckedStarRating(star_rating)) {
		alert('별점을 선택해주세요!');
		return document.querySelector('#star_rating').focus();
	}

	if (isEmptyPhoto(photo_link)) {
		alert('사진을 업로드하세요!');
		return document.querySelector('#photo_link').focus();
	}

	if (isEmptyContents(post_contents)) {
		alert('후기를 입력하세요!');
		return document.querySelector('#post_contents').focus();
	}

	const starRating = $('.ui.star.rating').rating('get rating');
	document.querySelector('#star_rating').value = starRating;

	return document.querySelector('#postForm').submit();
};
