const express = require('express');
const asyncify = require('express-asyncify');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-auth');
const authController = require('../controllers/auth-controller');

const router = asyncify(express.Router());

router.get('/', isNotLoggedIn, authController.getLogInPage);
router.post('/', isNotLoggedIn, authController.localLogIn);
router.post('/logout', isLoggedIn, authController.logOut);
router.get('/google-login', isNotLoggedIn, authController.redirectGoogleLogIn);
router.get('/google-login/callback', isNotLoggedIn, authController.googleLogIn);

module.exports = router;
