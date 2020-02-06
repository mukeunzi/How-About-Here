const db = require('../schema');
const { Op } = db.Sequelize;

class RegionController {
	async getRegionPage(req, res, next) {
		const regionList = await db.Region.getRegionListAll(db.User);

		res.render('region', { title: '지역관리', user: req.user, regionList });
	}

	async createRegion(req, res, next) {
		const authorObjectId = req.user.id;
		const regionName = req.body.regionName;

		const newRegion = await db.Region.createRegion(authorObjectId, regionName);
		const newRegionInfo = { newRegion, userName: req.user.userName };

		return res.json(newRegionInfo);
	}

	async deleteRegion(req, res, next) {
		const authorObjectId = req.user.id;
		const checkedRegions = req.query.id;

		await checkedRegions.map(async region => {
			await db.Region.deleteRegion(region);
			await db.Region.updateModifier(Op, { authorObjectId, region });
		});

		return res.json({ checkedRegions, userName: req.user.userName });
	}
}

module.exports = new RegionController();
