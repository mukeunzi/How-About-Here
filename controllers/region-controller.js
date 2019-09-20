const Region = require('../models/region');

class RegionController {
	getRegionPage(req, res, next) {
		res.render('region', { title: '지역관리' });
	}

	async createRegion(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			const region_name = req.body.region_name;

			const newRegion = await Region.createRegion(authorObjectId, region_name);
			const newRegionElement = `<tr>
        <td>${newRegion._id}</td>
        <td>${newRegion.region_name}</td>
        <td>${newRegion.status_code}</td>
        <td>${newRegion.create_id}</td>
        <td>${newRegion.create_date}</td>
        <td>${newRegion.update_id}</td>
        <td>${newRegion.update_date}</td>
      </tr>`;

			return res.send(newRegionElement);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RegionController();
