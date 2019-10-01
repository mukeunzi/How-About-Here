const Post = require('../models/post');

class IndexController {
	async getIndexPage(req, res, next) {
		const postList = await Post.getPostList();

		res.render('index', { title: 'Main', user: req.user, postList });
	}
}

module.exports = new IndexController();
