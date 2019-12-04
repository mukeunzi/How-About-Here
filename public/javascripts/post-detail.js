import { map, centerCoordinate } from './kakao-map-detail.js';
import { errorMessage } from './utils/error-message.js';
import { isDoubleSubmit } from './utils/double-submit.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

window.addEventListener('load', function() {
	replaceLineBreak();
	$('.ui.dropdown').dropdown();
	$('.ui.rating').rating('disable');
	moment.locale('ko');

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
			deleteCommentEvent(event);
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

	likeButton.addEventListener('click', function(event) {
		likeButtonEvent(event);
	});
});

const isValidFormData = comment_body => {
	if (!comment_body) {
		return false;
	}
	return true;
};

const makeNewCommentElement = jsonResult => {
	const commentBody = jsonResult.newComment.comment_body.replace(/(\n|\r\n)/g, '<br />');

	const newCommentElement = `<div class="comment">
		<a class="avatar">
			<img src="/images/profile.png">
		</a>
		<div class="content">
			<input class="comment_id" type="hidden" value=${jsonResult.newComment._id}>
			<a class="author">${jsonResult.userName}</a>
			<div class="metadata">
				<span class="date">${moment(jsonResult.newComment.create_date).fromNow()}</span>
				<span class="deleteComment" style="cursor:pointer;">삭제</span>
			</div>
			<div class="text comment_body">${commentBody}</div>
		</div>
	</div>`;

	return newCommentElement;
};

const addCommentEvent = async () => {
	const comment_body = document.querySelector('#comment_body').value;

	if (!isValidFormData(comment_body)) {
		alert('댓글을 입력하세요!');
		return document.querySelector('#comment_body').focus();
	}

	if (isDoubleSubmit()) {
		return;
	}

	const post_id = window.location.pathname.substring(6);
	try {
		const response = await fetch(`/comment/${post_id}`, {
			method: 'POST',
			body: JSON.stringify({ comment_body }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			const newCommentElement = makeNewCommentElement(result);

			const commentsList = document.querySelector('.ui.comments');
			commentsList.insertAdjacentHTML('beforeend', newCommentElement);

			const deleteCommentButton = commentsList.lastChild.querySelector('.deleteComment');
			deleteCommentButton.addEventListener('click', function(event) {
				deleteCommentEvent(event);
			});

			document.querySelector('#comment_body').value = '';
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const deleteCommentEvent = async event => {
	const isDelete = confirm('삭제하시겠습니까?');

	if (!isDelete) {
		return false;
	}

	const commentContent = event.target.parentNode.parentNode;
	const comment_id = commentContent.querySelector('.comment_id').value;

	try {
		const response = await fetch(`/comment/${comment_id}`, { method: 'DELETE' });

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			return commentContent.parentNode.remove();
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
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
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			location.href = '/';
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const likeButtonEvent = async event => {
	const post_id = window.location.pathname.substring(6);

	try {
		const response = await fetch(`/post/like/${post_id}`, { method: 'PATCH' });

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			event.target.className = result.action === 'like' ? 'heart red icon' : 'heart outline red icon';

			const likesCount = document.querySelector('#likes_count');
			likesCount.innerHTML = result.likes;
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
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
