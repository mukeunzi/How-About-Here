window.addEventListener('load', function() {
	$('.ui.rating').rating({
		initialRating: 3,
		maxRating: 5
	});

	const postForm = document.querySelector('#postForm');

	postForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});
});

const isValidFormData = () => {
	const place_name = document.querySelector('#place_name').value;
	const tag_list = document.querySelectorAll('.tag_list:checked').length;
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

const notCheckedTag = tag_list => {
	if (!tag_list) {
		return true;
	}
	return false;
};

const isEmptyTitle = place_name => {
	if (!place_name) {
		return true;
	}
	return false;
};

const isEmptyPhoto = photo_link => {
	if (!photo_link) {
		return true;
	}
	return false;
};

const isEmptyContents = post_contents => {
	if (!post_contents) {
		return true;
	}
	return false;
};
