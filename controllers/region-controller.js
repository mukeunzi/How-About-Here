const Region = require('../models/region');
const moment = require('moment');

class RegionController {
	async getRegionPage(req, res, next) {
		try {
			const regionList = await Region.getRegionListAll();

			res.render('region', { title: '지역관리', user: req.user, regionList });
		} catch (error) {
			next(error);
		}
	}

	async createRegion(req, res, next) {
		const authorObjectId = req.user._id;
		const region_name = req.body.region_name;

		try {
			const newRegion = await Region.createRegion(authorObjectId, region_name);
			const newRegionElement = `<tr>
        <td><input type='checkbox' class='_id' id=${newRegion._id} value=${newRegion._id}></td>
        <td>${newRegion.region_name}</td>
        <td class='status_code'>${newRegion.status_code}</td>
        <td>${req.user.user_name}</td>
        <td>${moment(newRegion.create_date).fromNow()}</td>
        <td>${req.user.user_name}</td>
        <td>${moment(newRegion.update_date).fromNow()}</td>
      </tr>`;

			return res.json({ newRegionElement });
		} catch (error) {
			next(error);
		}
	}

	async deleteRegion(req, res, next) {
		const authorObjectId = req.user._id;
		const checkedRegions = req.query._id;

		try {
			await checkedRegions.map(async region => {
				await Region.deleteRegion(authorObjectId, region);
			});

			return res.json({ checkedRegions });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RegionController();
