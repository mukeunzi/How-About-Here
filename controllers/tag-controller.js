const db = require('../schema');
const { Op } = db.Sequelize;

class TagController {
	async getTagPage(req, res, next) {
		const tagList = await db.Hashtag.getTagListAll(db.User);

		res.render('tag', { title: '태그관리', user: req.user, tagList });
	}

	async createTag(req, res, next) {
		const authorObjectId = req.user.id;
		const tagName = req.body.tagName;

		const newTag = await db.Hashtag.createTag(authorObjectId, tagName);
		const newTagInfo = { newTag, userName: req.user.userName };

		return res.json(newTagInfo);
	}

	async deleteTag(req, res, next) {
		const authorObjectId = req.user.id;
		const checkedTags = req.query.id;

		await checkedTags.map(async tag => {
			await db.Hashtag.deleteTag(tag);
			await db.Hashtag.updateModifier(Op, { authorObjectId, tag });
		});

		return res.json({ checkedTags, userName: req.user.userName });
	}
}

module.exports = new TagController();
