const Region = require('../models/region');
const moment = require('moment');

class RegionController {
	async getRegionPage(req, res, next) {
		const regionList = await Region.getRegionListAll();

		res.render('region', { title: '지역관리', user: req.user, regionList });
	}

	async createRegion(req, res, next) {
		const authorObjectId = req.user._id;
		const region_name = req.body.region_name;

		const newRegion = await Region.createRegion(authorObjectId, region_name);
		const newRegionInfo = { newRegion, userName: req.user.user_name };

		return res.json(newRegionInfo);
	}

	async deleteRegion(req, res, next) {
		const authorObjectId = req.user._id;
		const checkedRegions = req.query._id;

		await checkedRegions.map(async region => {
			await Region.deleteRegion(authorObjectId, region);
		});

		return res.json({ checkedRegions });
	}
}

module.exports = new RegionController();
