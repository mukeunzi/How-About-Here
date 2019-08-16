class IndexController {
	getIndexPage(req, res, next) {
		res.render('index', { title: 'Express', user: req.user });
	}
}

module.exports = new IndexController();
