const Comment = require('../models/comment');

class CommentController {
	async createComment(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;
		const { comment_body } = req.body;
		const commentForm = { comment_body, post_id };

		const newComment = await Comment.createComment(authorObjectId, commentForm);
		const newCommentInfo = { newComment, userName: req.user.user_name };

		return res.json(newCommentInfo);
	}

	async deleteComment(req, res, next) {
		const authorObjectId = req.user._id;
		const comment_id = req.params.comment_id;

		await Comment.deleteComment(authorObjectId, comment_id);

		return res.json({});
	}
}

module.exports = new CommentController();
