const Comment = require('../models/comment');
const moment = require('moment');

class CommentController {
	async createComment(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;
		const { comment_body } = req.body;
		const commentForm = { comment_body, post_id };

		try {
			const newComment = await Comment.createComment(authorObjectId, commentForm);
			newComment.comment_body = newComment.comment_body.replace(/(\n|\r\n)/g, '<br />');

			let newCommentElement = `<div class='comment'>
				<a class='avatar'>
					<img src='/images/profile.png'>
				</a>
				<div class='content'>
					<input class='comment_id' type='hidden' value=${newComment._id}>
					<a class='author'>${req.user.user_name}</a>
					<div class='metadata'>
						<span class='date'>${moment(newComment.create_date).fromNow()}</span>`;

			if (authorObjectId === newComment.create_id._id.toString()) {
				newCommentElement += `<span class='deleteComment' style='cursor:pointer;'>삭제</span>`;
			}

			newCommentElement += `</div>
					<div class='text comment_body'>${newComment.comment_body}</div>
				</div>
			</div>`;

			return res.send(newCommentElement);
		} catch (error) {
			next(error);
		}
	}

	async deleteComment(req, res, next) {
		const authorObjectId = req.user._id;
		const comment_id = req.params.comment_id;

		try {
			await Comment.deleteComment(authorObjectId, comment_id);

			return res.end();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CommentController();
