const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index-controller');

// 메인페이지
router.get('/', IndexController.getIndexPage);

// 검색
router.get('/search', IndexController.searchRegionAndTag);

module.exports = router;
