import { map, centerCoordinate } from './kakao-map-detail.js';
import { errorMessage } from './utils/error-message.js';
import { isDoubleSubmit } from './utils/double-submit.js';
import { isLoggedInUser, sendRequest, sendData } from './utils/fetch-api.js';

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
		const result = await sendData(`/comment/${post_id}`, 'POST', { comment_body });

		if (!isLoggedInUser(result.message)) {
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
		const result = await sendRequest(`/comment/${comment_id}`, 'DELETE');

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		commentContent.parentNode.remove();
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
		const result = await sendRequest(`/post/${post_id}`, 'DELETE');

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		location.href = '/';
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const likeButtonEvent = async event => {
	const post_id = window.location.pathname.substring(6);

	try {
		const result = await sendData(`/post/like/${post_id}`, 'PATCH');

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		event.target.className = result.action === 'like' ? 'heart red icon' : 'heart outline red icon';

		const likesCount = document.querySelector('#likes_count');
		likesCount.innerHTML = result.likes;
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
