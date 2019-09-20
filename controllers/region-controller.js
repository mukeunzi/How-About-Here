const Region = require('../models/region');

class RegionController {
	getRegionPage(req, res, next) {
		res.render('region', { title: '지역관리' });
	}
}

module.exports = new RegionController();
