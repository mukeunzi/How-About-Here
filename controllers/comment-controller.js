const Comment = require('../models/comment');
const moment = require('moment');

class CommentController {
	async createComment(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;
		const { comment_body } = req.body;
		const commentForm = { comment_body, post_id };

		const newComment = await Comment.createComment(authorObjectId, commentForm);
		const newCommentElement = `<div class="comment">
			<a class="avatar"><img src="/images/profile.png"></a>
			<div class="content">
				<a class="author">${req.user.user_name}</a>
				<div class="metadata">
					<span class="date">${moment(newComment.create_date).fromNow()}</span>
				</div>
				<div class="text">${newComment.comment_body}</div>
			</div>
		</div>`;

		return res.send(newCommentElement);
	}

	async deleteComment(req, res, next) {
		const authorObjectId = req.user._id;
		const comment_id = req.params.comment_id;

		await Comment.deleteComment(authorObjectId, comment_id);

		return res.end();
	}
}

module.exports = new CommentController();
