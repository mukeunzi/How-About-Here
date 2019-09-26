const express = require('express');
const postController = require('../controllers/post-controller');
const { isLoggedIn } = require('../middlewares/login-auth');

const router = express.Router();

//게시물 관련 페이지
router.get('/', isLoggedIn, postController.getPostFormPage);
router.post('/', isLoggedIn, postController.createPost);

module.exports = router;
