const express = require('express');
const asyncify = require('express-asyncify');
const { isNotLoggedIn } = require('../middlewares/login-auth');
const userController = require('../controllers/user-controller');

const router = asyncify(express.Router());

router.get('/', isNotLoggedIn, userController.getSignUpPage);
router.post('/', isNotLoggedIn, userController.createUser);
router.get('/:user_name', isNotLoggedIn, userController.isValidUserName);

module.exports = router;
