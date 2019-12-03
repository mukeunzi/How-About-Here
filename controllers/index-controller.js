const Region = require('../models/region');
const Tag = require('../models/tag');
const Post = require('../models/post');

class IndexController {
	async getIndexPage(req, res, next) {
		const regionList = await Region.getRegionList();
		const tagList = await Tag.getTagList();
		const postList = await Post.gedstPostList();

		res.render('index', { title: 'Main', user: req.user, regionList, tagList, postList });
	}

	async searchRegionAndTag(req, res, next) {
		const region_name = req.query.region_name;
		const tag_list = req.query.tag_list;

		const regionCondition = [];
		if (region_name) {
			regionCondition.push({ region_name });
		}

		const tagCondition = [];
		if (tag_list) {
			Array.prototype.map.call(tag_list, tag => {
				return tagCondition.push({ tag_list: tag });
			});
		}

		const searchCondition = regionCondition.concat(tagCondition);
		const searchResult = await Post.getSearchResult(searchCondition);

		return res.json(searchResult);
	}
}

module.exports = new IndexController();
