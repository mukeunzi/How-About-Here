const Region = require('../models/region');

class RegionController {
	async getRegionPage(req, res, next) {
		const regionList = await Region.getRegionListAll();

		res.render('region', { title: '지역관리', regionList });
	}

	async createRegion(req, res, next) {
		try {
			const authorObjectId = req.user._id;
			const region_name = req.body.region_name;

			const newRegion = await Region.createRegion(authorObjectId, region_name);
			const newRegionElement = `<tr>
        <td><input type='checkbox' class='_id' value=${newRegion._id}/></td>
        <td>${newRegion.region_name}</td>
        <td>${newRegion.status_code}</td>
        <td>${req.user.user_name}</td>
        <td>${newRegion.create_date}</td>
        <td>${req.user.user_name}</td>
        <td>${newRegion.update_date}</td>
      </tr>`;

			return res.send(newRegionElement);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RegionController();
