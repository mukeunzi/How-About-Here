window.addEventListener('load', function() {
	const postForm = document.querySelector('#postForm');

	postForm.addEventListener('submit', function(event) {
		event.preventDefault();
		isValidFormData();
	});
});

const isValidFormData = () => {
	const place_name = document.querySelector('#place_name').value;
	const post_contents = document.querySelector('#post_contents').value;
	const photo_link = document.querySelector('#photo_link').value;
	const star_rating = document.querySelector('#star_rating').value;

	if (isEmptyTitle(place_name)) {
		alert('장소를 입력하세요!');
		return document.querySelector('#place_name').focus();
	}

	if (isEmptyPhoto(photo_link)) {
		alert('사진을 업로드하세요!');
		return document.querySelector('#photo_link').focus();
	}

	if (isEmptyContents(post_contents)) {
		alert('후기를 입력하세요!');
		return document.querySelector('#post_contents').focus();
	}

	if (isEmptyScore(star_rating)) {
		alert('별점을 매겨주세요!');
		return document.querySelector('#star_rating').focus();
	}

	return document.querySelector('#postForm').submit();
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

const isEmptyScore = star_rating => {
	if (!star_rating) {
		return true;
	}
	return false;
};
