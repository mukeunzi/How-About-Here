const express = require('express');
const { isNotLoggedIn } = require('../middlewares/login-auth');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/', isNotLoggedIn, (req, res) => {
	userController.getSignUpPage(req, res);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
	await userController.signUp(req, res, next);
});

module.exports = router;
