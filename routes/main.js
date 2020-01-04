const express = require('express');
const asyncify = require('express-asyncify');
const IndexController = require('../controllers/index-controller');

const router = asyncify(express.Router());

// 메인페이지
router.get('/', IndexController.getIndexPage);

// 검색
router.get('/search', IndexController.searchRegionAndTag);

module.exports = router;
