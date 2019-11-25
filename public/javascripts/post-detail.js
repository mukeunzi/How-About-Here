import { map, centerCoordinate } from './kakao-map-detail.js';

window.addEventListener('load', function() {
	replaceLineBreak();
	$('.ui.dropdown').dropdown();
	$('.ui.rating').rating('disable');

	const modal = document.querySelector('#modal');
	const addCommentButton = document.querySelector('#addComment');
	const deleteCommentButtons = document.querySelectorAll('.deleteComment');
	const updatePostButton = document.querySelector('#updatePost');
	const deletePostButton = document.querySelector('#deletePost');
	const likeButton = document.querySelector('.heart');

	modal.addEventListener('click', function() {
		$('.ui.basic.modal').modal('show');
		map.relayout();
		map.setCenter(centerCoordinate);
	});

	addCommentButton.addEventListener('click', function(event) {
		addCommentEvent();
	});

	deleteCommentButtons.forEach(button => {
		button.addEventListener('click', function(event) {
			deleteCommentEvent(button);
		});
	});

	if (updatePostButton && deletePostButton) {
		updatePostButton.addEventListener('click', function() {
			const post_id = window.location.pathname.substring(6);
			location.href = `/post/edit/${post_id}`;
		});

		deletePostButton.addEventListener('click', function() {
			deletePostEvent();
		});
	}

	likeButton.addEventListener('click', function() {
		likeButtonEvent(likeButton);
	});
});

const isValidFormData = comment_body => {
	if (!comment_body) {
		return false;
	}
	return true;
};

const addCommentEvent = async () => {
	const comment_body = document.querySelector('#comment_body').value;

	if (!isValidFormData(comment_body)) {
		alert('댓글을 입력하세요!');
		return document.querySelector('#comment_body').focus();
	}

	const post_id = window.location.pathname.substring(6);
	try {
		const response = await fetch(`/comment/${post_id}`, {
			method: 'POST',
			body: JSON.stringify({ comment_body }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const result = await response.text();

			if (result === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			const commentsList = document.querySelector('.ui.comments');
			commentsList.insertAdjacentHTML('beforeend', result);

			document.querySelector('#comment_body').value = '';
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteCommentEvent = async button => {
	const isDelete = confirm('삭제하시겠습니까?');

	if (!isDelete) {
		return false;
	}

	const commentContent = button.parentNode.parentNode;
	const comment_id = commentContent.querySelector('.comment_id').value;

	try {
		const response = await fetch(`/comment/${comment_id}`, { method: 'DELETE' });

		if (response.ok) {
			const result = await response.text();

			if (result === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			commentContent.parentNode.remove();
		}
	} catch (error) {
		console.log(error);
	}
};

const deletePostEvent = async () => {
	const isDelete = confirm('삭제하시겠습니까?');

	if (!isDelete) {
		return false;
	}

	const post_id = window.location.pathname.substring(6);
	try {
		const response = await fetch(`/post/${post_id}`, { method: 'DELETE' });

		if (response.ok) {
			const result = await response.text();

			if (result === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			if (result === 'successDeletePost') {
				location.href = '/';
			} else {
				return alert('알 수 없는 오류입니다.');
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const likeButtonEvent = likeButton => {
	const likeClassName = likeButton.className.split(' ');

	if (likeClassName.includes('outline')) {
		return likePost(likeButton);
	}
	return unLikePost(likeButton);
};

const likePost = async likeButton => {
	const post_id = window.location.pathname.substring(6);

	try {
		const response = await fetch(`/post/like/${post_id}`, { method: 'POST' });

		if (response.ok) {
			const result = await response.text();

			if (result === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			likeButton.classList.remove('outline');

			const likesCount = document.querySelector('#likes_count');
			likesCount.innerHTML = result;
		}
	} catch (error) {
		console.log(error);
	}
};

const unLikePost = async likeButton => {
	const post_id = window.location.pathname.substring(6);

	try {
		const response = await fetch(`/post/like/${post_id}`, { method: 'DELETE' });

		if (response.ok) {
			const result = await response.text();

			if (result === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			likeButton.classList.add('outline');

			const likesCount = document.querySelector('#likes_count');
			likesCount.innerHTML = result;
		}
	} catch (error) {
		console.log(error);
	}
};

const replaceLineBreak = () => {
	const postContents = document.querySelector('#post_contents');
	const commentsList = document.querySelectorAll('.comment_body');

	const replaceContents = postContents.textContent.replace(/(\n|\r\n)/g, '<br />');
	postContents.innerHTML = replaceContents;

	commentsList.forEach(comments => {
		const replaceComments = comments.textContent.replace(/(\n|\r\n)/g, '<br />');
		comments.innerHTML = replaceComments;
	});
};
