const Tag = require('../models/tag');

class TagController {
	async getTagPage(req, res, next) {
		const tagList = await Tag.getTagListAll();

		res.render('tag', { title: '태그관리', tagList });
	}

	async createTag(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			const tag_name = req.body.tag_name;

			const newTag = await Tag.createTag(authorObjectId, tag_name);
			const newTagElement = `<tr>
        <td><input type='checkbox' class='_id' id=${newTag._id} value=${newTag._id}></td>
        <td>${newTag.tag_name}</td>
        <td class='status_code'>${newTag.status_code}</td>
        <td>${req.user.user_name}</td>
        <td>${newTag.create_date}</td>
        <td>${req.user.user_name}</td>
        <td>${newTag.update_date}</td>
      </tr>`;

			return res.send(newTagElement);
		} catch (error) {
			next(error);
		}
	}

	async deleteTag(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			const checkedTags = req.query._id;

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
