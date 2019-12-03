const Comment = require('../models/comment');

class CommentController {
	async createComment(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;
		const { comment_body } = req.body;
		const commentForm = { comment_body, post_id };

		try {
			const newComment = await Comment.createComment(authorObjectId, commentForm);
			const newCommentInfo = { newComment, userName: req.user.user_name };

			return res.json(newCommentInfo);
		} catch (error) {
			next(error);
		}
	}

	async deleteComment(req, res, next) {
		const authorObjectId = req.user._id;
		const comment_id = req.params.comment_id;

		try {
			await Comment.deleteComment(authorObjectId, comment_id);

			return res.json({});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CommentController();
