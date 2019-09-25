const express = require('express');
const adminController = require('../controllers/admin-controller');
const regionController = require('../controllers/region-controller');
const tagController = require('../controllers/tag-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

//관리자 - 메인 페이지
router.get('/', isLoggedIn, adminController.getIndexPage);

//관리자 - 지역 관리 페이지
router.get('/region', isLoggedIn, regionController.getRegionPage);
router.post('/region', isLoggedIn, regionController.createRegion);
router.delete('/region', isLoggedIn, regionController.deleteRegion);

//관리자 - 태그 관리 페이지
router.post('/tag', isLoggedIn, tagController.createTag);

module.exports = router;
