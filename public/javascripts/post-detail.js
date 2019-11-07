window.addEventListener('load', function() {
	$('.ui.rating').rating('disable');

	const modal = document.querySelector('#modal');
	const commentButton = document.querySelector('#commentButton');

	modal.addEventListener('click', function() {
		$('.ui.basic.modal').modal('show');
	});

	commentButton.addEventListener('click', function(event) {
		event.preventDefault();
		addComment();
	});
});

const isValidFormData = comment_body => {
	if (!comment_body) {
		return false;
	}
	return true;
};

const addComment = async () => {
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
			const newCommentElement = await response.text();

			const commentsList = document.querySelector('.ui.comments');
			commentsList.insertAdjacentHTML('beforeend', newCommentElement);

			document.querySelector('#comment_body').value = '';
		}
	} catch (error) {
		console.log(error);
	}
};
