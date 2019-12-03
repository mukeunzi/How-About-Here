const express = require('express');
const adminController = require('../controllers/admin-controller');
const regionController = require('../controllers/region-controller');
const tagController = require('../controllers/tag-controller');
const { isLoggedIn, isLoggedInForAjax } = require('../middlewares/login-auth');

const router = express.Router();

//관리자 - 메인 페이지
router.get('/', isLoggedIn, adminController.getIndexPage);

//관리자 - 지역 관리 페이지
router.get('/region', isLoggedIn, regionController.getRegionPage);
router.post('/region', isLoggedInForAjax, regionController.createRegion);
router.delete('/region', isLoggedInForAjax, regionController.deleteRegion);

//관리자 - 태그 관리 페이지
router.get('/tag', isLoggedIn, tagController.getTagPage);
router.post('/tag', isLoggedInForAjax, tagController.createTag);
router.delete('/tag', isLoggedInForAjax, tagController.deleteTag);

module.exports = router;
