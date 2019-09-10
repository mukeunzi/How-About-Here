const Post = require('../models/post');

class PostController {
	async getPostPage(req, res, next) {
		res.render('post', { title: '투표 포스팅' });
	}

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

	async deletePost(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			await Post.deletePost(authorObjectId, req.body);

			return res.redirect('/');
		} catch (error) {
			next(error);
		}
	}

	async getPostListAll(req, res, next) {
		try {
			const postListAll = await Post.getPostListAll();

			res.render('post-list', { title: '투표', postList: postListAll });
		} catch (error) {
			next(error);
		}
	}

	async getPostDetailPage(req, res, next) {
		try {
			const post_id = req.params.post_id;
			const getPostDetailPage = await Post.getPostDetailPage(post_id);

			res.json(getPostDetailPage);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new PostController();
