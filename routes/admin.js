const express = require('express');
const adminController = require('../controllers/admin-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

router.get('/', isLoggedIn, adminController.getIndexPage);

module.exports = router;
