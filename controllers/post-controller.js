const Post = require('../models/post');

class PostController {
	async createPost(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			await Post.createPost(authorObjectId, req.body);

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	async updatePost(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			await Post.updatePost(authorObjectId, req.body);

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new PostController();
