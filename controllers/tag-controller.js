const Tag = require('../models/tag');
const moment = require('moment');

class TagController {
	async getTagPage(req, res, next) {
		const tagList = await Tag.getTagListAll();

		res.render('tag', { title: '태그관리', user: req.user, tagList });
	}

	async createTag(req, res, next) {
		const authorObjectId = req.user._id;
		const tag_name = req.body.tag_name;

		const newTag = await Tag.createTag(authorObjectId, tag_name);
		const newTagInfo = { newTag, userName: req.user.user_name };

		return res.json(newTagInfo);
	}

	async deleteTag(req, res, next) {
		const authorObjectId = req.user._id;
		const checkedTags = req.query._id;

		await checkedTags.map(async tag => {
			await Tag.deleteTag(authorObjectId, tag);
		});

		return res.json({ checkedTags });
	}
}

module.exports = new TagController();
