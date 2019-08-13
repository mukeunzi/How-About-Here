const express = require('express');
const { isNotLoggedIn } = require('../middlewares/login-auth');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.get('/', isNotLoggedIn, userController.getSignUpPage);
router.post('/', isNotLoggedIn, userController.localSignUp);

module.exports = router;
