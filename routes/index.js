const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verify-token');
const IndexController = require('../controllers/index-controller');

router.get('/', verifyToken, IndexController.getIndexPage);

module.exports = router;
