const Tag = require('../models/tag');
const moment = require('moment');

class TagController {
	async getTagPage(req, res, next) {
		try {
			const tagList = await Tag.getTagListAll();

			res.render('tag', { title: '태그관리', user: req.user, tagList });
		} catch (error) {
			next(error);
		}
	}

	async createTag(req, res, next) {
		const authorObjectId = req.user._id;
		const tag_name = req.body.tag_name;

		try {
			const newTag = await Tag.createTag(authorObjectId, tag_name);
			const newTagElement = `<tr>
        <td><input type='checkbox' class='_id' id=${newTag._id} value=${newTag._id}></td>
        <td>${newTag.tag_name}</td>
        <td class='status_code'>${newTag.status_code}</td>
        <td>${req.user.user_name}</td>
        <td>${moment(newTag.create_date).fromNow()}</td>
        <td>${req.user.user_name}</td>
        <td>${moment(newTag.update_date).fromNow()}</td>
      </tr>`;

			return res.send(newTagElement);
		} catch (error) {
			next(error);
		}
	}

	async deleteTag(req, res, next) {
		const authorObjectId = req.user._id;
		const checkedTags = req.query._id;

		try {
			await checkedTags.map(async tag => {
				await Tag.deleteTag(authorObjectId, tag);
			});

			return res.send(JSON.stringify(checkedTags));
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TagController();
