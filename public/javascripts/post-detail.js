window.addEventListener('load', function() {
	$('.ui.rating').rating('disable');

	const modal = document.querySelector('#modal');
	const addCommentButton = document.querySelector('#addComment');
	const deleteCommentButtons = document.querySelectorAll('.deleteComment');

	modal.addEventListener('click', function() {
		$('.ui.basic.modal').modal('show');
	});

	addCommentButton.addEventListener('click', function(event) {
		addCommentEvent();
	});

	deleteCommentButtons.forEach(button => {
		button.addEventListener('click', function(event) {
			deleteCommentEvent(button);
		});
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
