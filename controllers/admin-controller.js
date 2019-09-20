class AdminController {
	getIndexPage(req, res, next) {
		res.render('admin', { title: '관리자 페이지' });
	}
}

module.exports = new AdminController();
