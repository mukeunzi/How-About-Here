const express = require('express');
const asyncify = require('express-asyncify');
const adminController = require('../controllers/admin-controller');
const regionController = require('../controllers/region-controller');
const tagController = require('../controllers/tag-controller');
const { isLoggedIn, isLoggedInForAjax } = require('../middlewares/login-auth');
const { isAdmin } = require('../middlewares/user-auth');

const router = asyncify(express.Router());

//관리자 - 메인 페이지
router.get('/', isLoggedIn, isAdmin, adminController.getIndexPage);

//관리자 - 지역 관리 페이지
router.get('/region', isLoggedIn, isAdmin, regionController.getRegionPage);
router.post('/region', isLoggedInForAjax, isAdmin, regionController.createRegion);
router.delete('/region', isLoggedInForAjax, isAdmin, regionController.deleteRegion);

//관리자 - 태그 관리 페이지
router.get('/tag', isLoggedIn, isAdmin, tagController.getTagPage);
router.post('/tag', isLoggedInForAjax, isAdmin, tagController.createTag);
router.delete('/tag', isLoggedInForAjax, isAdmin, tagController.deleteTag);

module.exports = router;
