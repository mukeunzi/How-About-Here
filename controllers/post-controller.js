const Post = require('../models/post');
const Region = require('../models/region');
const Tag = require('../models/tag');
const Comment = require('../models/comment');
const User = require('../models/user');

class PostController {
	async getPostFormPage(req, res, next) {
		const regionList = await Region.getRegionList();
		const tagList = await Tag.getTagList();

		res.render('post', { title: 'Posting', user: req.user, regionList, tagList });
	}

	async getPostDetailPage(req, res, next) {
		const authorObjectId = req.user;
		const post_id = req.params.post_id;

		const postDetail = await Post.getPostDetail(post_id);
		const commentsList = await Comment.getCommentsList(post_id);
		if (authorObjectId) {
			const userFavoritePosts = await User.getFavoritePosts(authorObjectId);
			req.user.likes = userFavoritePosts;
		}

		res.render('post-detail', { title: '상세 페이지', user: req.user, postDetail, commentsList });
	}

	async getPostEditFormPage(req, res, next) {
		const post_id = req.params.post_id;

		const postDetail = await Post.getPostDetail(post_id);
		const regionList = await Region.getRegionList();
		const tagList = await Tag.getTagList();

		res.render('post-edit', { title: 'Edit Posting', user: req.user, regionList, tagList, postDetail });
	}

	async createPost(req, res, next) {
		const authorObjectId = req.user._id;
		const { region_name } = req.body;

		const isDuplicated = await Region.checkDuplicatedRegion(region_name);
		if (!isDuplicated) {
			await Region.createRegion(authorObjectId, region_name);
		}

		const region_id = await Region.getRegionInfo(region_name);
		req.body.region_name = region_id;

		req.body.photo_link = req.file.location;

		const post_id = await Post.createPost(authorObjectId, req.body);

		res.redirect(`/post/${post_id}`);
	}

	async deletePost(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;

		await Post.deletePost(authorObjectId, post_id);

		return res.json({});
	}

	async updatePost(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;
		req.body._id = post_id;

		await Post.updatePost(authorObjectId, req.body);

		return res.json({});
	}

	async likeEvent(req, res, next) {
		const authorObjectId = req.user._id;
		const post_id = req.params.post_id;

		const isLiked = await User.isLikedPost(authorObjectId, post_id);

		if (isLiked) {
			await User.removeFavoritePosts(authorObjectId, post_id);
			const likes = await Post.updateLike(post_id, -1);

			return res.json({ action: 'unLike', likes });
		}

		await User.addFavoritePosts(authorObjectId, post_id);
		const likes = await Post.updateLike(post_id, 1);

		return res.json({ action: 'like', likes });
	}
}

module.exports = new PostController();
