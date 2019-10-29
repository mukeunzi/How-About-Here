const Post = require('../models/post');
const Region = require('../models/region');
const Tag = require('../models/tag');

class PostController {
	async getPostFormPage(req, res, next) {
		const regionList = await Region.getRegionList();
		const tagList = await Tag.getTagList();

		res.render('post', { title: 'Posting', regionList, tagList });
	}

	async getPostDetailPage(req, res, next) {
		const _id = req.params._id;
		const postDetail = await Post.getPostDetail(_id);

		res.render('post-detail', { title: '상세 페이지', postDetail });
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
}

module.exports = new PostController();
